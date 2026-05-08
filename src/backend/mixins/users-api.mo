import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import UserTypes "../types/users";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
) {
  public query ({ caller }) func getCallerUserProfile() : async ?UserTypes.UserProfile {
    userProfiles.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserTypes.UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to save profile");
    };
    UsersLib.saveProfile(userProfiles, caller, profile);
  };

  public query func getUserProfile(userId : CommonTypes.UserId) : async ?UserTypes.UserProfile {
    userProfiles.get(userId);
  };
};
