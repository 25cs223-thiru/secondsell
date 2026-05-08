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
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useCreateListing } from "@/hooks/useListings";
import type { Category, Condition, CreateListingArgs } from "@/types";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  FileText,
  Package,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
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

interface PublishedInfo {
  title: string;
  priceInCents: bigint;
  id: string;
}

export default function SellPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const navigate = useNavigate();
  const createListing = useCreateListing();

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
  const [published, setPublished] = useState<PublishedInfo | null>(null);

  // Auth guard — redirect to home if not logged in
  useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);

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

    const args: CreateListingArgs = {
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
      const result = await createListing.mutateAsync(args);
      const listingId: string =
        result && typeof result === "object" && "id" in result
          ? String((result as { id: unknown }).id)
          : "";
      setPublished({
        title: args.title,
        priceInCents: args.priceInCents,
        id: listingId,
      });
    } catch {
      toast.error("Failed to create listing", {
        description: "Please try again.",
      });
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setCondition("");
    setCategory("");
    setBrand("");
    setSize("");
    setImages([]);
    setErrors({});
    setTouched({});
    setPublished(null);
  };

  const fieldError = (field: keyof FormErrors) =>
    touched[field] ? errors[field] : undefined;

  // Show a loading skeleton while auth initialises — never return null
  if (isInitializing) {
    return (
      <div
        className="min-h-screen bg-background"
        data-ocid="sell.loading_state"
      >
        <div className="bg-card border-b border-border shadow-subtle">
          <div className="max-w-2xl mx-auto px-4 py-6 flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 w-32 bg-muted rounded animate-pulse" />
              <div className="h-3 w-48 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
        <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
          <div className="h-52 rounded-2xl bg-card border border-border animate-pulse" />
          <div className="h-72 rounded-2xl bg-card border border-border animate-pulse" />
          <div className="h-24 rounded-2xl bg-card border border-border animate-pulse" />
        </div>
      </div>
    );
  }

  // If not authenticated, show sign-in prompt
  if (!isAuthenticated) {
    return (
      <div
        className="min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4 text-center"
        data-ocid="sell.auth_gate"
      >
        <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
          <Package className="w-7 h-7 text-muted-foreground" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Sign in to sell
          </h1>
          <p className="text-muted-foreground mt-1 text-sm max-w-xs">
            Create your listing and reach buyers looking for pre-loved items.
          </p>
        </div>
        <Button onClick={login} data-ocid="sell.login_button">
          Sign in with Internet Identity
        </Button>
      </div>
    );
  }

  // ── Success state ─────────────────────────────────────────────────────────────────
  if (published) {
    const priceFormatted = (
      Number(published.priceInCents) / 100
    ).toLocaleString("en-US", { style: "currency", currency: "USD" });
    return (
      <div
        className="min-h-screen bg-background"
        data-ocid="sell.success_state"
      >
        {/* Header band */}
        <div className="bg-card border-b border-border shadow-subtle">
          <div className="max-w-2xl mx-auto px-4 py-6 flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-success/15 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <h1 className="font-display text-xl font-semibold text-foreground leading-tight">
                  Listing published!
                </h1>
                <p className="text-xs text-muted-foreground">
                  Your item is now live on the marketplace
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
              className="w-24 h-24 rounded-full bg-success/15 border-4 border-success/30 flex items-center justify-center mb-6"
            >
              <CheckCircle2 className="w-12 h-12 text-success" />
            </motion.div>

            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              &ldquo;{published.title}&rdquo;
            </h2>
            <p className="text-muted-foreground mb-1">
              Listed for{" "}
              <span className="font-semibold text-foreground">
                {priceFormatted}
              </span>
            </p>
            <p className="text-sm text-muted-foreground max-w-xs mb-10">
              Your listing is now visible to buyers. Share it with friends to
              sell faster!
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
              {published.id && (
                <Link
                  to="/listings/$id"
                  params={{ id: published.id }}
                  className="flex-1"
                  data-ocid="sell.view_listing_button"
                >
                  <Button variant="outline" className="w-full">
                    <Package className="w-4 h-4 mr-2" />
                    View My Listing
                  </Button>
                </Link>
              )}
              <Button
                className="flex-1"
                onClick={resetForm}
                data-ocid="sell.sell_another_button"
              >
                <Star className="w-4 h-4 mr-2" />
                Sell Another Item
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="sell.page">
      {/* Page header band */}
      <div className="bg-card border-b border-border shadow-subtle">
        <div className="max-w-2xl mx-auto px-4 py-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Go back"
            data-ocid="sell.back_button"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center">
              <Package className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold text-foreground leading-tight">
                List an item
              </h1>
              <p className="text-xs text-muted-foreground">
                Fill in the details below to publish your listing
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Form body */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-6"
          data-ocid="sell.form"
        >
          {/* Photos */}
          <section className="bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center">
                <Star className="w-3.5 h-3.5 text-accent" />
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
                data-ocid="sell.images.field_error"
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
              <Label htmlFor="title" className="text-sm font-medium">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g. Vintage Levi's 501 Jeans"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => handleBlur("title")}
                data-ocid="sell.title_input"
                className={
                  fieldError("title")
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {fieldError("title") && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="sell.title.field_error"
                >
                  {fieldError("title")}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the item — fabric, fit, brand, any wear or flaws..."
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleBlur("description")}
                data-ocid="sell.description_textarea"
                className={
                  fieldError("description")
                    ? "border-destructive focus-visible:ring-destructive"
                    : ""
                }
              />
              {fieldError("description") && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="sell.description.field_error"
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
                    data-ocid="sell.category_select"
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
                    data-ocid="sell.category.field_error"
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
                    data-ocid="sell.condition_select"
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
                    data-ocid="sell.condition.field_error"
                  >
                    {fieldError("condition")}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="brand" className="text-sm font-medium">
                  Brand
                </Label>
                <Input
                  id="brand"
                  placeholder="e.g. Levi's"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  data-ocid="sell.brand_input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="size" className="text-sm font-medium">
                  Size
                </Label>
                <Input
                  id="size"
                  placeholder="e.g. M, 32W, 10"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  data-ocid="sell.size_input"
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
              <Label htmlFor="price" className="text-sm font-medium">
                Price (USD) <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium select-none">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  onBlur={() => handleBlur("price")}
                  className={`pl-7 ${
                    fieldError("price")
                      ? "border-destructive focus-visible:ring-destructive"
                      : ""
                  }`}
                  data-ocid="sell.price_input"
                />
              </div>
              {fieldError("price") && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="sell.price.field_error"
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
              onClick={() => navigate({ to: "/" })}
              disabled={createListing.isPending}
              data-ocid="sell.cancel_button"
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createListing.isPending}
              data-ocid="sell.submit_button"
              className="flex-1"
            >
              {createListing.isPending ? (
                <span
                  className="flex items-center gap-2"
                  data-ocid="sell.loading_state"
                >
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Publishing…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Publish listing
                </span>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
