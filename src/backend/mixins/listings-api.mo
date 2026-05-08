import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import CommonTypes "../types/common";
import UserTypes "../types/users";
import ListingTypes "../types/listings";
import ListingsLib "../lib/listings";
import UsersLib "../lib/users";

mixin (
  accessControlState : AccessControl.AccessControlState,
  listings : Map.Map<CommonTypes.ListingId, ListingTypes.Listing>,
  userProfiles : Map.Map<CommonTypes.UserId, UserTypes.UserProfile>,
  nextListingId : { var value : Nat },
) {
  public shared ({ caller }) func createListing(args : ListingTypes.CreateListingArgs) : async ListingTypes.Listing {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to create a listing");
    };
    let id = nextListingId.value;
    nextListingId.value += 1;
    let sellerName = switch (UsersLib.getProfile(userProfiles, caller)) {
      case (?p) { p.username };
      case null { "" };
    };
    let listing = ListingsLib.createListing(listings, id, caller, sellerName, args);
    UsersLib.incrementListingCount(userProfiles, caller);
    listing;
  };

  public query func getListing(id : CommonTypes.ListingId) : async ?ListingTypes.Listing {
    ListingsLib.getListing(listings, id);
  };

  public shared ({ caller }) func updateListing(args : ListingTypes.UpdateListingArgs) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to update a listing");
    };
    ListingsLib.updateListing(listings, caller, args);
  };

  public shared ({ caller }) func deleteListing(id : CommonTypes.ListingId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to delete a listing");
    };
    ListingsLib.deleteListing(listings, caller, id);
    UsersLib.decrementListingCount(userProfiles, caller);
  };

  public query func getActiveListings(offset : Nat, limit : Nat) : async ListingTypes.ListingPage {
    ListingsLib.getActiveListings(listings, offset, limit);
  };

  public query func searchListings(keyword : Text, category : ?Text, offset : Nat, limit : Nat) : async ListingTypes.ListingPage {
    ListingsLib.searchListings(listings, keyword, category, offset, limit);
  };

  public query ({ caller }) func getMyListings() : async [ListingTypes.Listing] {
    ListingsLib.getListingsBySeller(listings, caller);
  };

  public shared ({ caller }) func markListingAsSold(id : CommonTypes.ListingId) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Must be logged in to mark a listing as sold");
    };
    ListingsLib.markAsSold(listings, caller, id);
  };
};
