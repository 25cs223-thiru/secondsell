import Map "mo:core/Map";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import CommonTypes "../types/common";
import ListingTypes "../types/listings";
import Int "mo:core/Int";

module {
  public func createListing(
    listings : Map.Map<CommonTypes.ListingId, ListingTypes.Listing>,
    nextId : Nat,
    sellerId : CommonTypes.UserId,
    sellerName : Text,
    args : ListingTypes.CreateListingArgs,
  ) : ListingTypes.Listing {
    let now = Int.abs(Time.now());
    let listing : ListingTypes.Listing = {
      id = nextId;
      sellerId;
      sellerName = ?sellerName;
      title = args.title;
      description = args.description;
      category = args.category;
      priceInCents = args.priceInCents;
      condition = args.condition;
      images = args.images;
      brand = args.brand;
      size = args.size;
      status = #active;
      createdAt = now;
      updatedAt = now;
    };
    listings.add(nextId, listing);
    listing;
  };

  public func getListing(
    listings : Map.Map<CommonTypes.ListingId, ListingTypes.Listing>,
    id : CommonTypes.ListingId,
  ) : ?ListingTypes.Listing {
    switch (listings.get(id)) {
      case (?listing) {
        if (listing.status == #deleted) { null } else { ?listing };
      };
      case null { null };
    };
  };

  public func updateListing(
    listings : Map.Map<CommonTypes.ListingId, ListingTypes.Listing>,
    caller : CommonTypes.UserId,
    args : ListingTypes.UpdateListingArgs,
  ) : () {
    switch (listings.get(args.id)) {
      case (?listing) {
        if (listing.sellerId != caller) {
          Runtime.trap("Unauthorized: Only the seller can update this listing");
        };
        if (listing.status == #sold) {
          Runtime.trap("Cannot update a sold listing");
        };
        if (listing.status == #deleted) {
          Runtime.trap("Cannot update a deleted listing");
        };
        listings.add(args.id, {
          listing with
          title = args.title;
          description = args.description;
          category = args.category;
          priceInCents = args.priceInCents;
          condition = args.condition;
          images = args.images;
          brand = args.brand;
          size = args.size;
          updatedAt = Int.abs(Time.now());
        });
      };
      case null {
        Runtime.trap("Listing not found");
      };
    };
  };

  public func deleteListing(
    listings : Map.Map<CommonTypes.ListingId, ListingTypes.Listing>,
    caller : CommonTypes.UserId,
    id : CommonTypes.ListingId,
  ) : () {
    switch (listings.get(id)) {
      case (?listing) {
        if (listing.sellerId != caller) {
          Runtime.trap("Unauthorized: Only the seller can delete this listing");
        };
        if (listing.status == #sold) {
          Runtime.trap("Cannot delete a sold listing");
        };
        listings.add(id, { listing with status = #deleted; updatedAt = Int.abs(Time.now()) });
      };
      case null {
        Runtime.trap("Listing not found");
      };
    };
  };

  public func markAsSold(
    listings : Map.Map<CommonTypes.ListingId, ListingTypes.Listing>,
    _caller : CommonTypes.UserId,
    id : CommonTypes.ListingId,
  ) : () {
    switch (listings.get(id)) {
      case (?listing) {
        listings.add(id, { listing with status = #sold; updatedAt = Int.abs(Time.now()) });
      };
      case null {
        Runtime.trap("Listing not found");
      };
    };
  };

  public func getActiveListings(
    listings : Map.Map<CommonTypes.ListingId, ListingTypes.Listing>,
    offset : Nat,
    limit : Nat,
  ) : ListingTypes.ListingPage {
    let active = listings.values()
      .filter(func(l) { l.status == #active })
      .toArray();
    let total = active.size();
    let sliced = if (offset >= total) {
      [];
    } else {
      let end = if (offset + limit > total) { total } else { offset + limit };
      active.sliceToArray(offset, end);
    };
    let nextOffset = if (offset + limit < total) { ?(offset + limit) } else { null };
    { listings = sliced; total; nextOffset };
  };

  public func searchListings(
    listings : Map.Map<CommonTypes.ListingId, ListingTypes.Listing>,
    keyword : Text,
    category : ?Text,
    offset : Nat,
    limit : Nat,
  ) : ListingTypes.ListingPage {
    let lower = keyword.toLower();
    let filtered = listings.values()
      .filter(func(l) {
        if (l.status != #active) { return false };
        let matchesKeyword = lower.isEmpty() or
          l.title.toLower().contains(#text lower) or
          l.description.toLower().contains(#text lower);
        let matchesCategory = switch (category) {
          case null { true };
          case (?cat) { l.category == cat };
        };
        matchesKeyword and matchesCategory;
      })
      .toArray();
    let total = filtered.size();
    let sliced = if (offset >= total) {
      [];
    } else {
      let end = if (offset + limit > total) { total } else { offset + limit };
      filtered.sliceToArray(offset, end);
    };
    let nextOffset = if (offset + limit < total) { ?(offset + limit) } else { null };
    { listings = sliced; total; nextOffset };
  };

  public func getListingsBySeller(
    listings : Map.Map<CommonTypes.ListingId, ListingTypes.Listing>,
    sellerId : CommonTypes.UserId,
  ) : [ListingTypes.Listing] {
    listings.values()
      .filter(func(l) { l.sellerId == sellerId and l.status != #deleted })
      .toArray();
  };
};
