import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, g as useComposedRefs, a as cn, d as useNavigate, u as useAuth, D as useMyProfile, P as Package, B as Button, L as Link, q as Skeleton, h as useParams, s as useUserProfile, l as ShoppingBag, f as ue, C as CircleCheck, F as useSaveProfile, I as Input } from "./index-DS9SGZgY.js";
import { P as Presence, C as ConditionBadge } from "./ConditionBadge-CFeXQIRf.js";
import { L as Label, I as ImageUploader, T as Textarea } from "./textarea-ZIWuZG_y.js";
import { P as PriceDisplay } from "./PriceDisplay-CU7qbh0Q.js";
import { A as AlertDialog, b as AlertDialogContent, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogCancel, h as AlertDialogAction, n as Avatar, p as AvatarImage, o as AvatarFallback, P as Pen, M as MessageCircle, T as Trash2, D as Dialog, i as DialogContent, j as DialogHeader, k as DialogTitle, m as DialogFooter } from "./dialog-lb7NEuEQ.js";
import { B as Badge } from "./badge-Da6mwtC-.js";
import { j as useId, P as Primitive, k as composeEventHandlers, c as createContextScope, i as useControllableState, r as useCallbackRef, s as useMyListings, d as useDeleteListing, e as useMarkListingAsSold } from "./useListings-CXBHvI5f.js";
import { c as createCollection, u as useDirection } from "./index-JPtkJw_u.js";
import { P as PackageCheck } from "./package-check-Shnq-bFO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",
      key: "1tc9qg"
    }
  ],
  ["circle", { cx: "12", cy: "13", r: "3", key: "1vg3eu" }]
];
const Camera = createLucideIcon("camera", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
const STATUS_CONFIG = {
  active: {
    label: "Active",
    className: "bg-accent/15 text-accent border-accent/30"
  },
  sold: {
    label: "Sold",
    className: "bg-secondary/15 text-secondary-foreground border-secondary/30"
  },
  deleted: {
    label: "Deleted",
    className: "bg-muted text-muted-foreground border-border"
  }
};
function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? {
    label: String(status),
    className: "bg-muted text-muted-foreground border-border"
  };
  const { label, className } = config;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center rounded-full border text-xs font-medium px-2 py-0.5 ${className}`,
      children: label
    }
  );
}
function StatPill({ count, label, icon, variant }) {
  const variantClasses = {
    active: "bg-accent/10 text-accent border-accent/25 hover:bg-accent/15",
    sold: "bg-primary/10 text-primary border-primary/25 hover:bg-primary/15",
    neutral: "bg-muted text-muted-foreground border-border hover:bg-muted/80"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `inline-flex items-center gap-2 px-3.5 py-2 rounded-full border text-sm font-medium transition-smooth ${variantClasses[variant]}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-80", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold tabular-nums", children: count }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-normal opacity-80", children: label })
      ]
    }
  );
}
function MyListingCard({
  listing,
  index,
  onEdit,
  onDelete,
  onMarkSold
}) {
  var _a, _b, _c;
  const imageUrl = ((_c = (_b = (_a = listing.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.getDirectURL) == null ? void 0 : _c.call(_b)) ?? "/assets/images/placeholder.svg";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `my_listing.item.${index}`,
      className: "group bg-card border border-border rounded-xl overflow-hidden shadow-subtle hover:shadow-elevated transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/listings/$id",
            params: { id: listing.id },
            className: "block relative aspect-[4/5] overflow-hidden bg-muted",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: imageUrl,
                  alt: listing.title,
                  className: "w-full h-full object-cover group-hover:scale-105 transition-smooth",
                  loading: "lazy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: listing.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConditionBadge, { condition: listing.condition }) }),
              listing.status === "sold" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-background/50 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 bg-card/90 border border-border rounded-full px-3 py-1.5 shadow-subtle", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-foreground", children: "Sold" })
              ] }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm text-foreground line-clamp-2 leading-snug", children: listing.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PriceDisplay,
            {
              priceCents: listing.priceInCents,
              size: "sm",
              className: "font-semibold"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 pt-0.5", children: [
            listing.status !== "sold" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "flex-1 h-8 text-xs",
                  onClick: () => onEdit(listing),
                  "data-ocid": `my_listing.edit_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3 mr-1" }),
                    "Edit"
                  ]
                }
              ),
              listing.status === "active" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  variant: "outline",
                  className: "flex-1 h-8 text-xs border-accent/40 text-accent hover:bg-accent/10",
                  onClick: () => onMarkSold(listing),
                  "data-ocid": `my_listing.mark_sold_button.${index}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "w-3 h-3 mr-1" }),
                    "Sold"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-8 w-8 p-0 text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0",
                onClick: () => onDelete(listing),
                "aria-label": "Delete listing",
                "data-ocid": `my_listing.delete_button.${index}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function ProfileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border shadow-subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-24 h-24 rounded-full shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3 text-center sm:text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-44 mx-auto sm:mx-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-72 mx-auto sm:mx-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-56 mx-auto sm:mx-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 justify-center sm:justify-start pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-28 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-24 rounded-full" })
        ] })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/5] rounded-xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-1/2" })
    ] }, k)) }) })
  ] });
}
function EditProfileModal({ open, onClose, profile }) {
  var _a, _b;
  const saveProfile = useSaveProfile();
  const [name, setName] = reactExports.useState(profile.name);
  const [bio, setBio] = reactExports.useState(profile.bio ?? "");
  const [avatarImages, setAvatarImages] = reactExports.useState(
    profile.avatar ? [profile.avatar] : []
  );
  reactExports.useEffect(() => {
    if (open) {
      setName(profile.name);
      setBio(profile.bio ?? "");
      setAvatarImages(profile.avatar ? [profile.avatar] : []);
    }
  }, [open, profile]);
  const handleSave = async () => {
    if (!name.trim()) return;
    try {
      await saveProfile.mutateAsync({
        ...profile,
        name: name.trim(),
        bio: bio.trim() || void 0,
        avatar: avatarImages[0] ?? void 0
      });
      ue.success("Profile updated!");
      onClose();
    } catch {
      ue.error("Failed to save profile.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-md", "data-ocid": "edit_profile.dialog", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-display text-lg", children: "Edit Profile" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Profile photo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-16 h-16 shrink-0 ring-2 ring-border", children: [
            ((_b = (_a = avatarImages[0]) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)) && /* @__PURE__ */ jsxRuntimeExports.jsx(
              AvatarImage,
              {
                src: avatarImages[0].getDirectURL(),
                alt: name
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary font-display font-bold text-lg", children: name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ImageUploader,
            {
              images: avatarImages,
              onChange: setAvatarImages,
              maxImages: 1
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ep-name", children: "Display name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "ep-name",
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "Your name",
            maxLength: 60,
            "data-ocid": "edit_profile.name_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ep-bio", children: "Bio / About" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "ep-bio",
            value: bio,
            onChange: (e) => setBio(e.target.value),
            placeholder: "Tell buyers a little about yourself — your style, what you sell, shipping speed…",
            rows: 4,
            maxLength: 280,
            className: "resize-none",
            "data-ocid": "edit_profile.bio_input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-right", children: [
          bio.length,
          "/280"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          onClick: onClose,
          "data-ocid": "edit_profile.cancel_button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: handleSave,
          disabled: !name.trim() || saveProfile.isPending,
          "data-ocid": "edit_profile.save_button",
          children: saveProfile.isPending ? "Saving…" : "Save changes"
        }
      )
    ] })
  ] }) });
}
function ProfileHeader({
  profile,
  activeCount,
  soldCount,
  isOwnProfile,
  onEditClick,
  onLogout
}) {
  var _a, _b;
  const displayName = (profile == null ? void 0 : profile.name) ?? "Seller";
  const avatarUrl = (_b = (_a = profile == null ? void 0 : profile.avatar) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a);
  const initials = displayName.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const joinedDate = (profile == null ? void 0 : profile.joinedAt) ? new Date(Number(profile.joinedAt) / 1e6).toLocaleDateString(
    "en-US",
    { month: "long", year: "numeric" }
  ) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "bg-card border-b border-border shadow-subtle",
      "data-ocid": "profile.header",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-10 max-w-4xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-center sm:items-start gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "w-24 h-24 ring-2 ring-border ring-offset-2 ring-offset-card", children: [
            avatarUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: avatarUrl, alt: displayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary/10 text-primary text-2xl font-display font-bold", children: initials })
          ] }),
          isOwnProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onEditClick,
              "aria-label": "Edit profile photo",
              className: "absolute inset-0 rounded-full flex items-center justify-center bg-foreground/40 opacity-0 group-hover:opacity-100 transition-smooth cursor-pointer",
              "data-ocid": "profile.avatar_edit_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5 text-card" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-3 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground truncate", children: displayName }),
            isOwnProfile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-center sm:justify-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  className: "gap-1.5 h-8",
                  onClick: onEditClick,
                  "data-ocid": "profile.edit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3.5 h-3.5" }),
                    "Edit profile"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "ghost",
                  size: "sm",
                  className: "gap-1.5 h-8 text-muted-foreground hover:text-destructive",
                  onClick: onLogout,
                  "data-ocid": "profile.logout_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3.5 h-3.5" }),
                    "Log out"
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "gap-1.5 h-8 self-center sm:self-auto",
                "data-ocid": "profile.message_seller_button",
                onClick: () => ue.info("Messaging coming soon!", {
                  description: "Direct messages will be available shortly."
                }),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "w-3.5 h-3.5" }),
                  "Message Seller"
                ]
              }
            )
          ] }),
          (profile == null ? void 0 : profile.bio) ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed max-w-lg break-words", children: profile.bio }) : isOwnProfile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: onEditClick,
              className: "flex items-center gap-1.5 text-sm text-muted-foreground/60 italic hover:text-accent transition-smooth group",
              "data-ocid": "profile.bio_placeholder_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Add a bio to introduce yourself to buyers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-3 h-3 opacity-0 group-hover:opacity-100 transition-smooth" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground/60 italic", children: "This seller hasn't added a bio yet." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 justify-center sm:justify-start pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatPill,
              {
                count: activeCount,
                label: "Active",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3.5 h-3.5" }),
                variant: "active"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              StatPill,
              {
                count: soldCount,
                label: "Sold",
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, { className: "w-3.5 h-3.5" }),
                variant: "sold"
              }
            ),
            joinedDate && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 text-xs text-muted-foreground px-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "w-3.5 h-3.5" }),
              "Member since ",
              joinedDate
            ] })
          ] })
        ] })
      ] }) })
    }
  );
}
function ProfilePage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, login, logout } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: listings = [], isLoading: listingsLoading } = useMyListings();
  const deleteListing = useDeleteListing();
  const markAsSold = useMarkListingAsSold();
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [tab, setTab] = reactExports.useState("all");
  const [deletingListing, setDeletingListing] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: "/" });
    }
  }, [authLoading, isAuthenticated, navigate]);
  if (authLoading || profileLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {});
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "min-h-screen bg-background flex flex-col items-center justify-center gap-5 px-4 text-center",
        "data-ocid": "profile.auth_gate",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground", children: "Sign in to view your profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm max-w-xs", children: "Manage your listings, track orders, and update your seller profile." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: login, "data-ocid": "profile.login_button", children: "Sign in with Internet Identity" })
        ]
      }
    );
  }
  const activeListings = listings.filter((l) => l.status === "active");
  const soldListings = listings.filter((l) => l.status === "sold");
  const filteredListings = tab === "active" ? activeListings : tab === "sold" ? soldListings : listings;
  const handleDelete = async () => {
    if (!deletingListing) return;
    try {
      await deleteListing.mutateAsync(deletingListing.id);
      ue.success("Listing deleted.");
    } catch {
      ue.error("Failed to delete listing.");
    } finally {
      setDeletingListing(null);
    }
  };
  const handleMarkSold = async (listing) => {
    try {
      await markAsSold.mutateAsync(listing.id);
      ue.success(`"${listing.title}" marked as sold!`);
    } catch {
      ue.error("Failed to update listing.");
    }
  };
  const handleEdit = (listing) => {
    navigate({ to: "/listings/$id/edit", params: { id: listing.id } });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProfileHeader,
      {
        profile,
        activeCount: activeListings.length,
        soldCount: soldListings.length,
        isOwnProfile: true,
        onEditClick: () => setEditOpen(true),
        onLogout: logout
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-display font-semibold text-foreground whitespace-nowrap", children: "My Listings" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tabs,
            {
              value: tab,
              onValueChange: (v) => setTab(v),
              "data-ocid": "profile.listings_tabs",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "all",
                    className: "text-xs px-3",
                    "data-ocid": "profile.tab.all",
                    children: [
                      "All (",
                      listings.length,
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "active",
                    className: "text-xs px-3",
                    "data-ocid": "profile.tab.active",
                    children: [
                      "Active (",
                      activeListings.length,
                      ")"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "sold",
                    className: "text-xs px-3",
                    "data-ocid": "profile.tab.sold",
                    children: [
                      "Sold (",
                      soldListings.length,
                      ")"
                    ]
                  }
                )
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "sm",
            className: "gap-1.5 shrink-0",
            "data-ocid": "profile.new_listing_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/sell", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
              "New listing"
            ] })
          }
        )
      ] }),
      listingsLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4",
          "data-ocid": "profile.listings.loading_state",
          children: ["a", "b", "c", "d"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-[4/5] rounded-xl" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full rounded-lg" })
          ] }, k))
        }
      ),
      !listingsLoading && filteredListings.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-20 space-y-4 bg-muted/30 rounded-2xl border border-dashed border-border",
          "data-ocid": "profile.listings.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: tab === "sold" ? "No sold listings yet" : tab === "active" ? "No active listings" : "No listings yet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: tab === "sold" ? "Items you sell will appear here." : "Start selling your second-hand items today." })
            ] }),
            tab !== "sold" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "gap-1.5",
                "data-ocid": "profile.empty_state.create_listing_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/sell", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                  "List your first item"
                ] })
              }
            )
          ]
        }
      ),
      !listingsLoading && filteredListings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4", children: filteredListings.map((listing, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        MyListingCard,
        {
          listing,
          index: i + 1,
          onEdit: handleEdit,
          onDelete: setDeletingListing,
          onMarkSold: handleMarkSold
        },
        listing.id
      )) })
    ] }) }),
    profile && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditProfileModal,
      {
        open: editOpen,
        onClose: () => setEditOpen(false),
        profile
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AlertDialog,
      {
        open: !!deletingListing,
        onOpenChange: (v) => !v && setDeletingListing(null),
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { "data-ocid": "profile.delete_listing.dialog", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete this listing?" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
              '"',
              deletingListing == null ? void 0 : deletingListing.title,
              `" will be permanently removed. Buyers won't be able to find it anymore.`
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { "data-ocid": "profile.delete_listing.cancel_button", children: "Keep it" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              AlertDialogAction,
              {
                onClick: handleDelete,
                className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                "data-ocid": "profile.delete_listing.confirm_button",
                children: deleteListing.isPending ? "Deleting…" : "Delete listing"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function SellerProfilePage() {
  const { userId } = useParams({ strict: false });
  const { data: profile, isLoading: profileLoading } = useUserProfile(userId);
  const activeCount = (profile == null ? void 0 : profile.totalListings) ?? 0;
  const soldCount = (profile == null ? void 0 : profile.totalSales) ?? 0;
  if (profileLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {});
  if (!profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-background flex items-center justify-center",
        "data-ocid": "seller_profile.not_found",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3 py-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-8 h-8 text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Seller not found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This profile doesn't exist or has been removed." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Browse listings" }) })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "seller_profile.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProfileHeader,
      {
        profile,
        activeCount,
        soldCount,
        isOwnProfile: false
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 py-8 max-w-4xl space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-lg font-display font-semibold text-foreground", children: [
          "Listings by ",
          profile.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
          activeCount,
          " active"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 space-y-3 bg-muted/30 rounded-2xl border border-dashed border-border",
          "data-ocid": "seller_profile.listings.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-7 h-7 text-muted-foreground" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground", children: "Browse all listings" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: "Search the marketplace to find items from this seller." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                size: "sm",
                className: "gap-1.5",
                "data-ocid": "seller_profile.browse_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                  "Browse marketplace"
                ] })
              }
            )
          ]
        }
      )
    ] }) })
  ] });
}
export {
  SellerProfilePage,
  ProfilePage as default
};
