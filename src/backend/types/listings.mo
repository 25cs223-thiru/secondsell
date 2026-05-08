import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Listing = {
    id : Common.ListingId;
    sellerId : Common.UserId;
    sellerName : ?Text;
    title : Text;
    description : Text;
    category : Text;
    priceInCents : Nat;
    condition : Common.ListingCondition;
    images : [Storage.ExternalBlob];
    brand : ?Text;
    size : ?Text;
    status : Common.ListingStatus;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type CreateListingArgs = {
    title : Text;
    description : Text;
    category : Text;
    priceInCents : Nat;
    condition : Common.ListingCondition;
    images : [Storage.ExternalBlob];
    brand : ?Text;
    size : ?Text;
  };

  public type UpdateListingArgs = {
    id : Common.ListingId;
    title : Text;
    description : Text;
    category : Text;
    priceInCents : Nat;
    condition : Common.ListingCondition;
    images : [Storage.ExternalBlob];
    brand : ?Text;
    size : ?Text;
  };

  public type ListingPage = {
    listings : [Listing];
    total : Nat;
    nextOffset : ?Nat;
  };
};
