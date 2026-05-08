import type { ExternalBlob } from "@/backend";
import { CATEGORIES } from "@/components/CategoryFilter";
import { ImageUploader } from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useListing, useUpdateListing } from "@/hooks/useListings";
import type { Category, Condition, UpdateListingArgs } from "@/types";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  DollarSign,
  FileText,
  Save,
  Tag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CONDITIONS: { value: Condition; label: string }[] = [
  { value: "new" as Condition, label: "New" },
  { value: "likeNew" as Condition, label: "Like New" },
  { value: "good" as Condition, label: "Good" },
  { value: "fair" as Condition, label: "Fair" },
  { value: "poor" as Condition, label: "Poor" },
];

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  price?: string;
  condition?: string;
  images?: string;
}

export default function EditListingPage() {
  const { id } = useParams({ from: "/listings/$id/edit" });
  const { isAuthenticated, isInitializing, principalId } = useAuth();
  const navigate = useNavigate();
  const { data: listing, isLoading } = useListing(id);
  const updateListing = useUpdateListing();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState<Condition | "">("");
  const [category, setCategory] = useState<Category | "">("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [images, setImages] = useState<ExternalBlob[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

  // Pre-populate form once listing loads
  useEffect(() => {
    if (listing && !hydrated) {
      setTitle(listing.title);
      setDescription(listing.description);
      setCategory(listing.category);
      setCondition(listing.condition);
      setPrice((Number(listing.priceInCents) / 100).toFixed(2));
      setImages(listing.images ?? []);
      setBrand(listing.brand ?? "");
      setSize(listing.size ?? "");
      setHydrated(true);
    }
  }, [listing, hydrated]);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Description is required";
    if (!category) e.category = "Category is required";
    if (!condition) e.condition = "Condition is required";
    if (!price || Number.isNaN(Number(price)) || Number(price) <= 0)
      e.price = "Enter a valid price greater than $0";
    if (images.length === 0) e.images = "Add at least 1 photo";
    return e;
  };

  const handleBlur = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = {
      title: true,
      description: true,
      category: true,
      condition: true,
      price: true,
      images: true,
    };
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const args: UpdateListingArgs = {
      id,
      title: title.trim(),
      description: description.trim(),
      category: category as Category,
      condition: condition as Condition,
      priceInCents: BigInt(Math.round(Number(price) * 100)),
      images,
      brand: brand.trim() || undefined,
      size: size.trim() || undefined,
    };
    try {
      await updateListing.mutateAsync(args);
      toast.success("Listing updated!", {
        description: "Your changes have been saved.",
      });
      navigate({ to: "/listings/$id", params: { id } });
    } catch {
      toast.error("Failed to update listing", {
        description: "Please try again.",
      });
    }
  };

  const fieldError = (field: keyof FormErrors) =>
    touched[field] ? errors[field] : undefined;

  if (isInitializing || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-card border-b border-border shadow-subtle">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <Skeleton className="h-8 w-48" />
          </div>
        </div>
        <div
          className="max-w-2xl mx-auto px-4 py-10 space-y-6"
          data-ocid="edit_listing.loading_state"
        >
          <Skeleton className="h-52 rounded-2xl" />
          <Skeleton className="h-72 rounded-2xl" />
          <Skeleton className="h-24 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4"
        data-ocid="edit_listing.error_state"
      >
        <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-destructive" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          Listing not found
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs">
          This listing doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate({ to: "/" })} variant="outline">
          Back to home
        </Button>
      </div>
    );
  }

  if (listing.sellerId !== principalId) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4"
        data-ocid="edit_listing.error_state"
      >
        <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-7 h-7 text-destructive" />
        </div>
        <h2 className="font-display text-xl font-semibold text-foreground">
          Not authorized
        </h2>
        <p className="text-muted-foreground text-sm max-w-xs">
          You can only edit your own listings.
        </p>
        <Button onClick={() => navigate({ to: "/" })} variant="outline">
          Back to home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="edit_listing.page">
      {/* Page header band */}
      <div className="bg-card border-b border-border shadow-subtle">
        <div className="max-w-2xl mx-auto px-4 py-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/listings/$id", params: { id } })}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Go back"
            data-ocid="edit_listing.back_button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-display text-xl font-semibold text-foreground leading-tight">
              Edit listing
            </h1>
            <p className="text-xs text-muted-foreground truncate max-w-sm">
              {listing.title}
            </p>
          </div>
        </div>
      </div>

      {/* Form body */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
          data-ocid="edit_listing.form"
        >
          {/* Photos */}
          <section className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                <Tag className="w-3.5 h-3.5 text-accent" />
              </div>
              <h2 className="font-display font-semibold text-foreground">
                Photos
              </h2>
              <span className="text-xs text-muted-foreground ml-auto">
                1–5 images required
              </span>
            </div>
            <ImageUploader
              images={images}
              onChange={(imgs) => {
                setImages(imgs);
                setTouched((p) => ({ ...p, images: true }));
              }}
              maxImages={5}
            />
            {touched.images && errors.images && (
              <p
                className="text-xs text-destructive"
                data-ocid="edit_listing.images.field_error"
              >
                {errors.images}
              </p>
            )}
          </section>

          {/* Item details */}
          <section className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <FileText className="w-3.5 h-3.5 text-primary" />
              </div>
              <h2 className="font-display font-semibold text-foreground">
                Item details
              </h2>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-title" className="text-sm font-medium">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-title"
                placeholder="e.g. Vintage Levi's 501 Jeans"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => handleBlur("title")}
                data-ocid="edit_listing.title_input"
                className={
                  fieldError("title")
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {fieldError("title") && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="edit_listing.title.field_error"
                >
                  {fieldError("title")}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-description" className="text-sm font-medium">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="edit-description"
                placeholder="Describe the item — fabric, fit, brand, any wear or flaws..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleBlur("description")}
                data-ocid="edit_listing.description_textarea"
                className={
                  fieldError("description")
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {fieldError("description") && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="edit_listing.description.field_error"
                >
                  {fieldError("description")}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={category}
                  onValueChange={(v) => {
                    setCategory(v as Category);
                    setTouched((p) => ({ ...p, category: true }));
                  }}
                >
                  <SelectTrigger
                    data-ocid="edit_listing.category_select"
                    className={
                      fieldError("category") ? "border-destructive" : ""
                    }
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldError("category") && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="edit_listing.category.field_error"
                  >
                    {fieldError("category")}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">
                  Condition <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={condition}
                  onValueChange={(v) => {
                    setCondition(v as Condition);
                    setTouched((p) => ({ ...p, condition: true }));
                  }}
                >
                  <SelectTrigger
                    data-ocid="edit_listing.condition_select"
                    className={
                      fieldError("condition") ? "border-destructive" : ""
                    }
                  >
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITIONS.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldError("condition") && (
                  <p
                    className="text-xs text-destructive"
                    data-ocid="edit_listing.condition.field_error"
                  >
                    {fieldError("condition")}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="edit-brand" className="text-sm font-medium">
                  Brand
                </Label>
                <Input
                  id="edit-brand"
                  placeholder="e.g. Levi's"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  data-ocid="edit_listing.brand_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="edit-size" className="text-sm font-medium">
                  Size
                </Label>
                <Input
                  id="edit-size"
                  placeholder="e.g. M, 32W, 10"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  data-ocid="edit_listing.size_input"
                />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center">
                <DollarSign className="w-3.5 h-3.5 text-secondary-foreground" />
              </div>
              <h2 className="font-display font-semibold text-foreground">
                Pricing
              </h2>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-price" className="text-sm font-medium">
                Price (USD) <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium select-none">
                  $
                </span>
                <Input
                  id="edit-price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onBlur={() => handleBlur("price")}
                  className={`pl-7 ${fieldError("price") ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  data-ocid="edit_listing.price_input"
                />
              </div>
              {fieldError("price") && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="edit_listing.price.field_error"
                >
                  {fieldError("price")}
                </p>
              )}
            </div>
          </section>

          {/* Actions */}
          <div className="flex items-center gap-3 pb-10">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate({ to: "/listings/$id", params: { id } })}
              disabled={updateListing.isPending}
              data-ocid="edit_listing.cancel_button"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateListing.isPending}
              data-ocid="edit_listing.submit_button"
              className="flex-1"
            >
              {updateListing.isPending ? (
                <span
                  className="flex items-center gap-2"
                  data-ocid="edit_listing.loading_state"
                >
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Saving…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Save changes
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
