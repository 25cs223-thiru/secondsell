import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import ListingTypes "../types/listings";
import OrderTypes "../types/orders";
import OrdersLib "../lib/orders";
import ListingsLib "../lib/listings";

mixin (
  accessControlState : AccessControl.AccessControlState,
  listings : Map.Map<CommonTypes.ListingId, ListingTypes.Listing>,
  orders : Map.Map<CommonTypes.OrderId, OrderTypes.Order>,
  nextOrderId : { var value : Nat },
  stripeConfig : { var value : ?Stripe.StripeConfiguration },
  transformFn : OutCall.Transform,
) {
  public shared ({ caller }) func placeOrder(
    listingId : CommonTypes.ListingId,
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to place an order");
    };
    let listing = switch (ListingsLib.getListing(listings, listingId)) {
      case null { Runtime.trap("Listing not found") };
      case (?l) { l };
    };
    if (listing.status != #active) {
      Runtime.trap("Listing is no longer available");
    };
    if (listing.sellerId == caller) {
      Runtime.trap("Cannot buy your own listing");
    };
    let cfg = switch (stripeConfig.value) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    let item : Stripe.ShoppingItem = {
      productName = listing.title;
      currency = "usd";
      quantity = 1;
      priceInCents = listing.priceInCents;
      productDescription = listing.description;
    };
    let sessionId = await Stripe.createCheckoutSession(cfg, caller, [item], successUrl, cancelUrl, transformFn);
    let orderId = nextOrderId.value;
    nextOrderId.value += 1;
    ignore OrdersLib.createOrder(
      orders,
      orderId,
      listingId,
      caller,
      listing.sellerId,
      listing.priceInCents,
      sessionId,
    );
    sessionId;
  };
  public shared ({ caller }) func updateOrderStatusFromSession(sessionId : Text) : async ?OrderTypes.Order {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in");
    };
    let cfg = switch (stripeConfig.value) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
    let result = await Stripe.getSessionStatus(cfg, sessionId, transformFn);
    switch (result) {
      case (#completed _) {
        switch (OrdersLib.getOrderByStripeSession(orders, sessionId)) {
          case (?order) {
            OrdersLib.updateOrderStatus(orders, order.id, #paid);
            ListingsLib.markAsSold(listings, order.sellerId, order.listingId);
            return OrdersLib.getOrder(orders, order.id);
          };
          case null { return null };
        };
      };
      case (#failed _) { return null };
    };
  };

  public query ({ caller }) func getMyOrders() : async [OrderTypes.Order] {
    OrdersLib.getOrdersByBuyer(orders, caller);
  };

  public query ({ caller }) func getOrder(id : CommonTypes.OrderId) : async ?OrderTypes.Order {
    switch (OrdersLib.getOrder(orders, id)) {
      case (?order) {
        if (order.buyerId != caller and order.sellerId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Cannot view this order");
        };
        ?order;
      };
      case null { null };
    };
  };
};
