import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import CommonTypes "../types/common";
import UserTypes "../types/users";
import Int "mo:core/Int";

module {
  public func getProfile(
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
    userId : CommonTypes.UserId,
  ) : ?UserTypes.UserProfile {
    profiles.get(userId);
  };

  public func saveProfile(
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
    caller : CommonTypes.UserId,
    profile : UserTypes.UserProfile,
  ) : () {
    let existing = profiles.get(caller);
    let createdAt = switch (existing) {
      case (?p) { p.createdAt };
      case null { Int.abs(Time.now()) };
    };
    let listingCount = switch (existing) {
      case (?p) { p.listingCount };
      case null { 0 };
    };
    profiles.add(caller, { profile with userId = caller; createdAt; listingCount });
  };

  public func incrementListingCount(
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
    userId : CommonTypes.UserId,
  ) : () {
    switch (profiles.get(userId)) {
      case (?p) {
        profiles.add(userId, { p with listingCount = p.listingCount + 1 });
      };
      case null {};
    };
  };

  public func decrementListingCount(
    profiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
    userId : CommonTypes.UserId,
  ) : () {
    switch (profiles.get(userId)) {
      case (?p) {
        let newCount = if (p.listingCount > 0) { p.listingCount - 1 : Nat } else { 0 };
        profiles.add(userId, { p with listingCount = newCount });
      };
      case null {};
    };
  };
};
