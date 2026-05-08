module {
  public type UserId = Principal;
  public type ListingId = Nat;
  public type OrderId = Nat;
  public type Timestamp = Nat;

  public type OrderStatus = {
    #pending;
    #paid;
    #shipped;
    #delivered;
    #cancelled;
  };

  public type ListingCondition = {
    #new;
    #likeNew;
    #good;
    #fair;
    #poor;
  };

  public type ListingStatus = {
    #active;
    #sold;
    #deleted;
  };
};
