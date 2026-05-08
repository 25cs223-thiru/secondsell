import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, B as Button, a as cn, E as ExternalBlob, z as Primitive } from "./index-DS9SGZgY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
  ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
  ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
];
const Image = createLucideIcon("image", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload = createLucideIcon("upload", __iconNode);
function ImageUploader({
  images,
  onChange,
  maxImages = 6,
  className
}) {
  const inputRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState([]);
  const [dragOver, setDragOver] = reactExports.useState(false);
  const processFiles = async (files) => {
    const allowed = maxImages - images.length - uploading.filter((u) => !u.done).length;
    const toProcess = files.slice(0, allowed);
    if (!toProcess.length) return;
    const newUploading = toProcess.map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      previewUrl: URL.createObjectURL(file),
      progress: 0,
      done: false
    }));
    setUploading((prev) => [...prev, ...newUploading]);
    const results = await Promise.all(
      toProcess.map(async (file, i) => {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
          setUploading(
            (prev) => prev.map(
              (u) => u.id === newUploading[i].id ? { ...u, progress: pct } : u
            )
          );
        });
        setUploading(
          (prev) => prev.map(
            (u) => u.id === newUploading[i].id ? { ...u, done: true, blob } : u
          )
        );
        return blob;
      })
    );
    onChange([...images, ...results]);
    setTimeout(() => {
      setUploading((prev) => prev.filter((u) => !u.done));
    }, 1500);
  };
  const handleFileChange = (e) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) {
      processFiles(
        Array.from(e.dataTransfer.files).filter(
          (f) => f.type.startsWith("image/")
        )
      );
    }
  };
  const removeImage = (index) => {
    const next = images.filter((_, i) => i !== index);
    onChange(next);
  };
  const canUploadMore = images.length < maxImages;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-3", className), "data-ocid": "image_uploader", children: [
    images.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: images.map((blob, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative aspect-square rounded-lg overflow-hidden bg-muted border border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: blob.getDirectURL(),
              alt: `Listing ${i + 1}`,
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => removeImage(i),
              className: "absolute top-1 right-1 p-0.5 rounded-full bg-foreground/60 text-background hover:bg-foreground/80 transition-colors",
              "aria-label": `Remove image ${i + 1}`,
              "data-ocid": `image_uploader.remove_button.${i + 1}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" })
            }
          )
        ]
      },
      blob.getDirectURL()
    )) }),
    uploading.filter((u) => !u.done).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: uploading.filter((u) => !u.done).map((u) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative aspect-square rounded-lg overflow-hidden bg-muted border border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: u.previewUrl,
              alt: u.name,
              className: "w-full h-full object-cover opacity-60"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-accent transition-all",
              style: { width: `${u.progress}%` }
            }
          ) }) })
        ]
      },
      u.id
    )) }),
    canUploadMore && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        onDragOver: (e) => {
          e.preventDefault();
          setDragOver(true);
        },
        onDragLeave: () => setDragOver(false),
        onDrop: handleDrop,
        className: cn(
          "border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-smooth",
          dragOver ? "border-accent bg-accent/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
        ),
        "data-ocid": "image_uploader.dropzone",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-5 h-5 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Drop files here" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "or click to browse — ",
              images.length,
              "/",
              maxImages,
              " uploaded"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: () => {
                var _a;
                return (_a = inputRef.current) == null ? void 0 : _a.click();
              },
              "data-ocid": "image_uploader.upload_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "w-4 h-4 mr-2" }),
                "Choose files"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept: "image/*",
        multiple: true,
        className: "hidden",
        onChange: handleFileChange
      }
    )
  ] });
}
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
export {
  ImageUploader as I,
  Label as L,
  Textarea as T
};
