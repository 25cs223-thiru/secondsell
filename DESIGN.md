# Design Brief

## Visual Direction
Warm, modern, trustworthy secondhand marketplace. Curated thrift aesthetic meets clean commerce. Approachable and human-centered, avoiding both sterile corporate tech vibes and overly precious vintage aesthetics. Inspiration: Vinted/Depop refined.

## Tone & Personality
Clean minimalism with warmth. Friendly, approachable, trustworthy. Encourages exploration and discovery while maintaining professional credibility for high-trust transactions (buying from strangers).

## Color Palette

| Name | OKLCH | Purpose |
|------|-------|---------|
| Primary (Warm Taupe) | 0.45 0.08 60 | Foundational, earthy, worn aesthetic |
| Secondary (Cool Grey-Blue) | 0.55 0.05 230 | Trust, clarity, calm |
| Accent (Warm Teal) | 0.60 0.18 175 | Energy, discovery, CTAs, interactions |
| Destructive (Warm Red) | 0.55 0.20 15 | Alerts, warnings, consistency |
| Background | 0.98 0.01 60 | Warm white, not clinical |
| Card | 0.99 0 0 | Pure white, product listings |
| Muted | 0.92 0.02 60 | Secondary info, subtle accents |
| Foreground | 0.15 0.02 60 | Warm charcoal text |

## Typography
- Display: Bricolage Grotesque (distinctive, modern, friendly; marketplace branding)
- Body: DM Sans (open, clean, highly readable; product details & descriptions)
- Mono: System default
- Hierarchy: Display 24/32/40px, Body 14/16/18px, enforced via component design

## Shape Language
Border radius: 24px max (friendly without cartoonish). Subtle shadows via `shadow-subtle` (0 1px 3px) and `shadow-elevated` (0 4px 12px). Clean borders at 1px. No excessive rounding.

## Structural Zones

| Zone | Background | Border | Treatment |
|------|-----------|--------|-----------|
| Header | Primary (0.45 0.08 60) | Bottom border-primary | Logo/search centered, filter toggle right (mobile), full filter row desktop |
| Filter Drawer | Card (0.99 0 0) | Bottom border-border | Collapsible on mobile, category chips, price slider, sort dropdown |
| Filter Sticky Header | Muted (0.92 0.02 60) | Bottom border-border | Active filter chips visible on scroll, 44px height minimum |
| Hero Categories | Background (0.98 0.01 60) | None | Popular categories with item count badges, horizontal scroll on mobile |
| Browse Grid | Background | None | 4-col desktop, 2-col tablet, 1-col mobile, 16px gap, cards 44px+ touch target |
| Product Card | Card (0.99 0 0) | Left condition border | Image 60%, seller badge overlay, condition badge bottom-right, hover lift shadow |
| Product Detail | Background | Card bg section | Left image gallery (mobile: carousel), right info card, trust badges |
| Checkout | Background | None | Minimal, focused form, Stripe iframe, trust signals (lock icon, HTTPS badge) |
| Footer | Muted (0.92 0.02 60) | Top border-primary | Links, sustainability messaging, support contact

## Elevation & Depth
Card shadows create hierarchy: `shadow-subtle` for hover states, `shadow-elevated` for modals/popovers. No floating orbs or decorative blurs. Depth through layered backgrounds and selective elevation only.

## Spacing & Rhythm
Grid-based 8px system: cards at 16px gaps, padding 24px/16px, alternating section backgrounds for rhythm. Dense in browse (efficient scanning), spacious in product detail (focus). Section separation via background color, not borders.

## Component Patterns
- CTAs: Accent background, warm-teal color, secondary button outline
- Cards: White bg, subtle border, image-first layout
- Seller Badge: Primary background, white text, rounded-full, avatar + name
- Condition Badge: Left border color-coded (Mint: emerald, Good: cyan, Fair: amber, Poor: red)
- Search: Muted background, accent ring on focus
- Filter Chip: Muted/accent toggle, sticky header on mobile
- Form inputs: Muted background, accent ring on focus
- Price Slider: Accent color, 44px+ thumb height for mobile touch

## Motion Choreography
Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) for all interactive elements. Smooth hover effects (no snappy bounces). Product image zoom on detail page. No entrance animations on page load (respect user preferences).

## Constraints
- No gradients (solid colors only)
- No full-page backgrounds (compositional layers)
- No rainbow palettes (4 core colors max + chart colors)
- No raw color literals or arbitrary Tailwind colors (token-only styling)
- High contrast foreground-on-background (>0.7 L difference)
- High contrast foreground-on-primary (>0.45 L difference)

## Signature Detail
Trust-focused condition badge system on listing cards: left border color-coded (Mint: emerald, Good: cyan, Fair: amber, Poor: red) plus seller avatar/name overlay at bottom-left creates dual-signal confidence in item quality and seller credibility. Card hover lifts via `shadow-card-hover`, elevating browse from static grid to interactive discovery. Mobile cards stack vertically with 44px+ touch targets for accessibility.

## Differentiation
Dual trust signals on every card: condition border color + seller avatar creates instant credibility for secondhand commerce. Filter drawer collapses on mobile while keeping active filter chips sticky in header for continuous context. Price slider with large 44px+ touch targets, sort dropdown, and popular categories hero section with item counts accelerate discovery. This transforms SecondSell from generic marketplace to curated, mobile-optimized, trust-first thrift platform.
