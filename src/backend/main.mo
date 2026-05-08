import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Runtime "mo:core/Runtime";

import CommonTypes "types/common";
import UserTypes "types/users";
import ListingTypes "types/listings";
import OrderTypes "types/orders";

import UsersMixin "mixins/users-api";
import ListingsMixin "mixins/listings-api";
import OrdersMixin "mixins/orders-api";





actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage (handles file upload/download proxy)
  include MixinObjectStorage();

  // User profiles
  let userProfiles = Map.empty<CommonTypes.UserId, UserTypes.UserProfile>();
  include UsersMixin(accessControlState, userProfiles);

  // Listings
  let listings = Map.empty<CommonTypes.ListingId, ListingTypes.Listing>();
  let nextListingId = { var value : Nat = 0 };
  include ListingsMixin(accessControlState, listings, userProfiles, nextListingId);

  // Orders
  let orders = Map.empty<CommonTypes.OrderId, OrderTypes.Order>();
  let nextOrderId = { var value : Nat = 0 };
  let stripeConfig = { var value : ?Stripe.StripeConfiguration = null };

  // transform must be declared before use in include
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  include OrdersMixin(accessControlState, listings, orders, nextOrderId, stripeConfig, transform);

  // Stripe — required directly in actor
  public query func isStripeConfigured() : async Bool {
    stripeConfig.value != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can configure Stripe");
    };
    stripeConfig.value := ?config;
  };

  func getStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig.value) {
      case (null) { Runtime.trap("Stripe is not configured") };
      case (?cfg) { cfg };
    };
  };

  public shared ({ caller }) func createCheckoutSession(
    items : [Stripe.ShoppingItem],
    successUrl : Text,
    cancelUrl : Text,
  ) : async Text {
    await Stripe.createCheckoutSession(getStripeConfig(), caller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(getStripeConfig(), sessionId, transform);
  };
};
