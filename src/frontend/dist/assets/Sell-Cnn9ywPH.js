import { c as createLucideIcon, u as useAuth, d as useNavigate, r as reactExports, j as jsxRuntimeExports, P as Package, B as Button, C as CircleCheck, m as motion, L as Link, A as ArrowRight, e as ArrowLeft, I as Input, f as ue } from "./index-DS9SGZgY.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, C as CATEGORIES, d as SelectItem } from "./select-mRGUXOsF.js";
import { I as ImageUploader, L as Label, T as Textarea } from "./textarea-ZIWuZG_y.js";
import { u as useCreateListing } from "./useListings-CXBHvI5f.js";
import { F as FileText, D as DollarSign } from "./file-text-WKHxTiV_.js";
import "./badge-Da6mwtC-.js";
import "./chevron-down-DDfZ2P0s.js";
import "./index-JPtkJw_u.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
const CONDITIONS = [
  { value: "new", label: "New" },
  { value: "likeNew", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" }
];
function SellPage() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const navigate = useNavigate();
  const createListing = useCreateListing();
  const [title, setTitle] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [condition, setCondition] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("");
  const [brand, setBrand] = reactExports.useState("");
  const [size, setSize] = reactExports.useState("");
  const [images, setImages] = reactExports.useState([]);
  const [errors, setErrors] = reactExports.useState({});
  const [touched, setTouched] = reactExports.useState({});
  const [published, setPublished] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);
  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Description is required";
    if (!category) e.category = "Category is required";
    if (!condition) e.condition = "Condition is required";
    if (!price || Number.isNaN(Number(price)) || Number(price) <= 0)
      e.price = "Enter a valid price greater than $0";
    if (images.length === 0) e.images = "Add at least 1 photo";
    return e;
  };
  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = {
      title: true,
      description: true,
      category: true,
      condition: true,
      price: true,
      images: true
    };
    setTouched(allTouched);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    const args = {
      title: title.trim(),
      description: description.trim(),
      category,
      condition,
      priceInCents: BigInt(Math.round(Number(price) * 100)),
      images,
      brand: brand.trim() || void 0,
      size: size.trim() || void 0
    };
    try {
      const result = await createListing.mutateAsync(args);
      const listingId = result && typeof result === "object" && "id" in result ? String(result.id) : "";
      setPublished({
        title: args.title,
        priceInCents: args.priceInCents,
        id: listingId
      });
    } catch {
      ue.error("Failed to create listing", {
        description: "Please try again."
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
  const fieldError = (field) => touched[field] ? errors[field] : void 0;
  if (isInitializing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen bg-background",
        "data-ocid": "sell.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-muted animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 w-32 bg-muted rounded animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-48 bg-muted rounded animate-pulse" })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-10 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52 rounded-2xl bg-card border border-border animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 rounded-2xl bg-card border border-border animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-24 rounded-2xl bg-card border border-border animate-pulse" })
          ] })
        ]
      }
    );
  }
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[70vh] flex flex-col items-center justify-center gap-5 px-4 text-center",
        "data-ocid": "sell.auth_gate",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-7 h-7 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Sign in to sell" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm max-w-xs", children: "Create your listing and reach buyers looking for pre-loved items." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "sell.login_button", children: "Sign in with Internet Identity" })
        ]
      }
    );
  }
  if (published) {
    const priceFormatted = (Number(published.priceInCents) / 100).toLocaleString("en-US", { style: "currency", currency: "USD" });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen bg-background",
        "data-ocid": "sell.success_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-6 flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-success/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-success" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold text-foreground leading-tight", children: "Listing published!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Your item is now live on the marketplace" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 16 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.4, ease: "easeOut" },
              className: "flex flex-col items-center text-center",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { scale: 0 },
                    animate: { scale: 1 },
                    transition: {
                      delay: 0.1,
                      type: "spring",
                      stiffness: 260,
                      damping: 20
                    },
                    className: "w-24 h-24 rounded-full bg-success/15 border-4 border-success/30 flex items-center justify-center mb-6",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-12 h-12 text-success" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-bold text-foreground mb-2", children: [
                  "“",
                  published.title,
                  "”"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mb-1", children: [
                  "Listed for",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: priceFormatted })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs mb-10", children: "Your listing is now visible to buyers. Share it with friends to sell faster!" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 w-full max-w-sm", children: [
                  published.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/listings/$id",
                      params: { id: published.id },
                      className: "flex-1",
                      "data-ocid": "sell.view_listing_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", className: "w-full", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-4 h-4 mr-2" }),
                        "View My Listing"
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      className: "flex-1",
                      onClick: resetForm,
                      "data-ocid": "sell.sell_another_button",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4 mr-2" }),
                        "Sell Another Item",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 ml-2" })
                      ]
                    }
                  )
                ] })
              ]
            }
          ) })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "sell.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/" }),
          className: "p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
          "aria-label": "Go back",
          "data-ocid": "sell.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-5 h-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold text-foreground leading-tight", children: "List an item" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Fill in the details below to publish your listing" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        noValidate: true,
        className: "space-y-6",
        "data-ocid": "sell.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-3.5 h-3.5 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Photos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-auto", children: "1–5 images required" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ImageUploader,
              {
                images,
                onChange: (imgs) => {
                  setImages(imgs);
                  setTouched((p) => ({ ...p, images: true }));
                },
                maxImages: 5
              }
            ),
            touched.images && errors.images && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: "text-xs text-destructive",
                "data-ocid": "sell.images.field_error",
                children: errors.images
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Item details" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "title", className: "text-sm font-medium", children: [
                "Title ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "title",
                  placeholder: "e.g. Vintage Levi's 501 Jeans",
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
                  onBlur: () => handleBlur("title"),
                  "data-ocid": "sell.title_input",
                  className: fieldError("title") ? "border-destructive focus-visible:ring-destructive" : ""
                }
              ),
              fieldError("title") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "sell.title.field_error",
                  children: fieldError("title")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "description", className: "text-sm font-medium", children: [
                "Description ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "description",
                  placeholder: "Describe the item — fabric, fit, brand, any wear or flaws...",
                  rows: 4,
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  onBlur: () => handleBlur("description"),
                  "data-ocid": "sell.description_textarea",
                  className: fieldError("description") ? "border-destructive focus-visible:ring-destructive" : ""
                }
              ),
              fieldError("description") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "sell.description.field_error",
                  children: fieldError("description")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
                  "Category ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: category,
                    onValueChange: (v) => {
                      setCategory(v);
                      setTouched((p) => ({ ...p, category: true }));
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          "data-ocid": "sell.category_select",
                          className: fieldError("category") ? "border-destructive" : "",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: cat, children: cat }, cat)) })
                    ]
                  }
                ),
                fieldError("category") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "sell.category.field_error",
                    children: fieldError("category")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "text-sm font-medium", children: [
                  "Condition ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Select,
                  {
                    value: condition,
                    onValueChange: (v) => {
                      setCondition(v);
                      setTouched((p) => ({ ...p, condition: true }));
                    },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        SelectTrigger,
                        {
                          "data-ocid": "sell.condition_select",
                          className: fieldError("condition") ? "border-destructive" : "",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select condition" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CONDITIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c.value, children: c.label }, c.value)) })
                    ]
                  }
                ),
                fieldError("condition") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-xs text-destructive",
                    "data-ocid": "sell.condition.field_error",
                    children: fieldError("condition")
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "brand", className: "text-sm font-medium", children: "Brand" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "brand",
                    placeholder: "e.g. Levi's",
                    value: brand,
                    onChange: (e) => setBrand(e.target.value),
                    "data-ocid": "sell.brand_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "size", className: "text-sm font-medium", children: "Size" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "size",
                    placeholder: "e.g. M, 32W, 10",
                    value: size,
                    onChange: (e) => setSize(e.target.value),
                    "data-ocid": "sell.size_input"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-secondary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-3.5 h-3.5 text-secondary-foreground" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Pricing" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "price", className: "text-sm font-medium", children: [
                "Price (USD) ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium select-none", children: "$" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "price",
                    type: "number",
                    min: "0.01",
                    step: "0.01",
                    placeholder: "0.00",
                    value: price,
                    onChange: (e) => setPrice(e.target.value),
                    onBlur: () => handleBlur("price"),
                    className: `pl-7 ${fieldError("price") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                    "data-ocid": "sell.price_input"
                  }
                )
              ] }),
              fieldError("price") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "sell.price.field_error",
                  children: fieldError("price")
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pb-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => navigate({ to: "/" }),
                disabled: createListing.isPending,
                "data-ocid": "sell.cancel_button",
                className: "flex-1",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: createListing.isPending,
                "data-ocid": "sell.submit_button",
                className: "flex-1",
                children: createListing.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-2",
                    "data-ocid": "sell.loading_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
                      "Publishing…"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }),
                  "Publish listing"
                ] })
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
export {
  SellPage as default
};
