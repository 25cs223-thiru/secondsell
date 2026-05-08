import { c as createLucideIcon, j as jsxRuntimeExports, a as cn } from "./index-DS9SGZgY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function PriceDisplay({
  priceCents,
  className,
  size = "md"
}) {
  const dollars = Number(priceCents) / 100;
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: dollars % 1 === 0 ? 0 : 2
  }).format(dollars);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "font-display tabular-nums",
        size === "sm" && "text-sm",
        size === "md" && "text-base",
        size === "lg" && "text-2xl font-bold",
        className
      ),
      children: formatted
    }
  );
}
export {
  CircleX as C,
  PriceDisplay as P
};
