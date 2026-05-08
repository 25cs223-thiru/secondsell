import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type UserProfile = {
    userId : Common.UserId;
    username : Text;
    bio : Text;
    avatarUrl : ?Storage.ExternalBlob;
    listingCount : Nat;
    createdAt : Common.Timestamp;
  };
};
