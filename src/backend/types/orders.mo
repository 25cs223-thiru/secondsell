import Common "common";

module {
  public type Order = {
    id : Common.OrderId;
    listingId : Common.ListingId;
    buyerId : Common.UserId;
    sellerId : Common.UserId;
    priceInCents : Nat;
    status : Common.OrderStatus;
    stripeSessionId : Text;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };
};
