import { c as createLucideIcon, h as useParams, u as useAuth, d as useNavigate, r as reactExports, j as jsxRuntimeExports, q as Skeleton, B as Button, e as ArrowLeft, I as Input, f as ue } from "./index-DS9SGZgY.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, C as CATEGORIES, d as SelectItem } from "./select-mRGUXOsF.js";
import { I as ImageUploader, L as Label, T as Textarea } from "./textarea-ZIWuZG_y.js";
import { b as useListing, f as useUpdateListing } from "./useListings-CXBHvI5f.js";
import { T as Tag } from "./tag-mcpUbaJM.js";
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
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
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
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
const CONDITIONS = [
  { value: "new", label: "New" },
  { value: "likeNew", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "poor", label: "Poor" }
];
function EditListingPage() {
  const { id } = useParams({ from: "/listings/$id/edit" });
  const { isAuthenticated, isInitializing, principalId } = useAuth();
  const navigate = useNavigate();
  const { data: listing, isLoading } = useListing(id);
  const updateListing = useUpdateListing();
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
  const [hydrated, setHydrated] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isInitializing && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, navigate]);
  reactExports.useEffect(() => {
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
      id,
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
      await updateListing.mutateAsync(args);
      ue.success("Listing updated!", {
        description: "Your changes have been saved."
      });
      navigate({ to: "/listings/$id", params: { id } });
    } catch {
      ue.error("Failed to update listing", {
        description: "Please try again."
      });
    }
  };
  const fieldError = (field) => touched[field] ? errors[field] : void 0;
  if (isInitializing || isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-48" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "max-w-2xl mx-auto px-4 py-10 space-y-6",
          "data-ocid": "edit_listing.loading_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-52 rounded-2xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72 rounded-2xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" })
          ]
        }
      )
    ] });
  }
  if (!listing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4",
        "data-ocid": "edit_listing.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-7 h-7 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Listing not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "This listing doesn't exist or has been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({ to: "/" }), variant: "outline", children: "Back to home" })
        ]
      }
    );
  }
  if (listing.sellerId !== principalId) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4",
        "data-ocid": "edit_listing.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-7 h-7 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold text-foreground", children: "Not authorized" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-xs", children: "You can only edit your own listings." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({ to: "/" }), variant: "outline", children: "Back to home" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "edit_listing.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 py-6 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/listings/$id", params: { id } }),
          className: "p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground",
          "aria-label": "Go back",
          "data-ocid": "edit_listing.back_button",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-5 h-5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold text-foreground leading-tight", children: "Edit listing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate max-w-sm", children: listing.title })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleSubmit,
        noValidate: true,
        className: "space-y-6",
        "data-ocid": "edit_listing.form",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-card rounded-2xl border border-border shadow-subtle p-6 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3.5 h-3.5 text-accent" }) }),
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
                "data-ocid": "edit_listing.images.field_error",
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-title", className: "text-sm font-medium", children: [
                "Title ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "edit-title",
                  placeholder: "e.g. Vintage Levi's 501 Jeans",
                  value: title,
                  onChange: (e) => setTitle(e.target.value),
                  onBlur: () => handleBlur("title"),
                  "data-ocid": "edit_listing.title_input",
                  className: fieldError("title") ? "border-destructive focus-visible:ring-destructive" : ""
                }
              ),
              fieldError("title") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "edit_listing.title.field_error",
                  children: fieldError("title")
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-description", className: "text-sm font-medium", children: [
                "Description ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "edit-description",
                  placeholder: "Describe the item — fabric, fit, brand, any wear or flaws...",
                  rows: 4,
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                  onBlur: () => handleBlur("description"),
                  "data-ocid": "edit_listing.description_textarea",
                  className: fieldError("description") ? "border-destructive focus-visible:ring-destructive" : ""
                }
              ),
              fieldError("description") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "edit_listing.description.field_error",
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
                          "data-ocid": "edit_listing.category_select",
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
                    "data-ocid": "edit_listing.category.field_error",
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
                          "data-ocid": "edit_listing.condition_select",
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
                    "data-ocid": "edit_listing.condition.field_error",
                    children: fieldError("condition")
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-brand", className: "text-sm font-medium", children: "Brand" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "edit-brand",
                    placeholder: "e.g. Levi's",
                    value: brand,
                    onChange: (e) => setBrand(e.target.value),
                    "data-ocid": "edit_listing.brand_input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "edit-size", className: "text-sm font-medium", children: "Size" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "edit-size",
                    placeholder: "e.g. M, 32W, 10",
                    value: size,
                    onChange: (e) => setSize(e.target.value),
                    "data-ocid": "edit_listing.size_input"
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
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { htmlFor: "edit-price", className: "text-sm font-medium", children: [
                "Price (USD) ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium select-none", children: "$" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "edit-price",
                    type: "number",
                    min: "0.01",
                    step: "0.01",
                    placeholder: "0.00",
                    value: price,
                    onChange: (e) => setPrice(e.target.value),
                    onBlur: () => handleBlur("price"),
                    className: `pl-7 ${fieldError("price") ? "border-destructive focus-visible:ring-destructive" : ""}`,
                    "data-ocid": "edit_listing.price_input"
                  }
                )
              ] }),
              fieldError("price") && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "text-xs text-destructive",
                  "data-ocid": "edit_listing.price.field_error",
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
                onClick: () => navigate({ to: "/listings/$id", params: { id } }),
                disabled: updateListing.isPending,
                "data-ocid": "edit_listing.cancel_button",
                className: "flex-1",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                disabled: updateListing.isPending,
                "data-ocid": "edit_listing.submit_button",
                className: "flex-1",
                children: updateListing.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "flex items-center gap-2",
                    "data-ocid": "edit_listing.loading_state",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
                      "Saving…"
                    ]
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
                  "Save changes"
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
  EditListingPage as default
};
