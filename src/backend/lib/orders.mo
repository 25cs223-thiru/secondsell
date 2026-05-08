import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import OrderTypes "../types/orders";
import Int "mo:core/Int";

module {
  public func createOrder(
    orders : Map.Map<CommonTypes.OrderId, OrderTypes.Order>,
    nextId : Nat,
    listingId : CommonTypes.ListingId,
    buyerId : CommonTypes.UserId,
    sellerId : CommonTypes.UserId,
    priceInCents : Nat,
    stripeSessionId : Text,
  ) : OrderTypes.Order {
    let now = Int.abs(Time.now());
    let order : OrderTypes.Order = {
      id = nextId;
      listingId;
      buyerId;
      sellerId;
      priceInCents;
      status = #pending;
      stripeSessionId;
      createdAt = now;
      updatedAt = now;
    };
    orders.add(nextId, order);
    order;
  };

  public func getOrder(
    orders : Map.Map<CommonTypes.OrderId, OrderTypes.Order>,
    id : CommonTypes.OrderId,
  ) : ?OrderTypes.Order {
    orders.get(id);
  };

  public func updateOrderStatus(
    orders : Map.Map<CommonTypes.OrderId, OrderTypes.Order>,
    id : CommonTypes.OrderId,
    status : CommonTypes.OrderStatus,
  ) : () {
    switch (orders.get(id)) {
      case (?order) {
        orders.add(id, { order with status; updatedAt = Int.abs(Time.now()) });
      };
      case null {
        Runtime.trap("Order not found");
      };
    };
  };

  public func getOrdersByBuyer(
    orders : Map.Map<CommonTypes.OrderId, OrderTypes.Order>,
    buyerId : CommonTypes.UserId,
  ) : [OrderTypes.Order] {
    orders.values()
      .filter(func(o) { o.buyerId == buyerId })
      .toArray();
  };

  public func getOrderByStripeSession(
    orders : Map.Map<CommonTypes.OrderId, OrderTypes.Order>,
    sessionId : Text,
  ) : ?OrderTypes.Order {
    orders.values()
      .find(func(o) { o.stripeSessionId == sessionId });
  };
};
