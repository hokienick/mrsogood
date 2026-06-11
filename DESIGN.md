---
name: Mr. So Good
description: Bold solo web designer portfolio that converts small business owners with before/after proof
colors:
  roasted-ink: "#1A1410"
  chalk: "#F7F6F3"
  harbor-navy: "#2B3A52"
  driftwood: "#8B6F47"
  sunset-coral: "#E86B3A"
  sunset-coral-deep: "#C4552A"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 9rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 5.5rem)"
    fontWeight: 900
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 3rem)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  full: "9999px"
spacing:
  gutter-mobile: "24px"
  gutter-desktop: "40px"
components:
  button-primary:
    backgroundColor: "{colors.sunset-coral}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.full}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.sunset-coral-deep}"
---

# Design System: Mr. So Good

## 1. Overview

**Creative North Star: "The Hot Hand"**

A solo player on a streak. Every surface should feel like it was made by one confident person who is fast, a little showy, and always delivers. The system is built on heavy editorial type (Archivo Black at 900, set tight and low), a warm dark ink, and one loud coral that does the talking. Motion is part of the voice: springy, physical, responsive, never decorative filler.

This system explicitly rejects the generic AI/SaaS template (Inter, purple gradients, identical icon-card grids, eyebrow labels on every section), corporate agency safety, and overdesigned portfolio-art scroll-jacking. The body background question is resolved (June 2026): the site is ink-led, and light sections sit on Chalk #F7F6F3, a true zero-chroma off-white. The old cream #F5F0E8 (warm-neutral AI-default band) is retired; warmth comes from the coral, the type, and the work itself, never from a parchment page.

**Key Characteristics:**
- Massive, tight-set Archivo 900 display type with italic moments for emphasis
- One dominant accent (Sunset Coral) used with intent, not sprinkled
- Tactile and confident interaction: spring easings, press-down scale, shimmer on CTAs
- Subtle analog grain (4% noise overlay) on dark sections, no glow blobs
- Before/after client work is the visual centerpiece; the system frames it, never competes

## 2. Colors

A warm, high-contrast palette with San Diego in its bones: dark roasted ink, harbor navy, driftwood brown, and one unmissable sunset coral.

### Primary
- **Sunset Coral** (#E86B3A): The brand's voice. Primary CTAs, nav logo accent, link hover states, focus rings. The color of the "Free Mockup" button, the single most important element on the site.
- **Sunset Coral Deep** (#C4552A): Pressed/hover state of coral elements only. Never a standalone accent.

### Secondary
- **Harbor Navy** (#2B3A52): Supporting structural color for select sections and graphic moments. Padres-inspired. Used sparingly; not a second voice.

### Tertiary
- **Driftwood** (#8B6F47): Warm brown-sand for small accents and texture moments. The rarest color in the system.

### Neutral
- **Roasted Ink** (#1A1410): Body text, dark section backgrounds (always with the 4% noise overlay), borders at low opacity (ink/8 for hairlines, ink/75 for secondary text).
- **Chalk** (#F7F6F3): Light section background and text-on-dark color. True zero-chroma off-white; deliberately not cream. Replaced the retired cream #F5F0E8.

### Named Rules
**The One Voice Rule.** Sunset Coral is the only color allowed to demand attention. Navy and Driftwood support; they never compete. If two colors are shouting on one screen, one of them is wrong.

**The No-Blob Rule.** Dark sections are `bg-ink noise-overlay` only. Animated coral glow blobs are prohibited.

## 3. Typography

**Display Font:** Archivo (sans-serif fallback)
**Body Font:** Space Grotesk (sans-serif fallback)

**Character:** A heavyweight geometric display set tight and low against a quirky, technical body face. The pairing is loud headline, plainspoken delivery, exactly the brand's voice.

### Hierarchy
- **Display** (900, clamp(3.5rem, 8vw, 9rem), 0.92 line-height, -0.04em): Hero headlines only. Italic 900 (`.display-italic`) for single emphasized words inside display settings.
- **Headline** (900, clamp(2.5rem, 5vw, 5.5rem), 0.94, -0.035em): Section headings.
- **Title** (900, clamp(1.75rem, 3vw, 3rem), 1.0, -0.025em): Card titles, sub-section heads.
- **Body** (400-500, 1rem, 1.6): Space Grotesk. All prose, nav links, labels. Cap line length at 65-75ch.

### Named Rules
**The Tracking Floor Rule.** Display letter-spacing never goes tighter than -0.04em. The current scale already sits at the floor; do not tighten further.

**The Two Family Rule.** Archivo and Space Grotesk are the entire type system. No third font, no exceptions.

## 4. Elevation

Flat by default. Surfaces are flat at rest; depth appears only as a response to state. Project cards carry a whisper of shadow at rest (0 1px 3px rgba(26,20,16,0.06)) and lift on hover (0 14px 36px rgba(26,20,16,0.1) plus a coral-tinted border). Dark sections convey depth through the 4% noise grain, not shadows.

### Shadow Vocabulary
- **Rest whisper** (`box-shadow: 0 1px 3px rgba(26, 20, 16, 0.06)`): Cards at rest. Barely there.
- **Hover lift** (`box-shadow: 0 14px 36px rgba(26, 20, 16, 0.1)`): Cards on hover, paired with `border-color: rgba(232, 107, 58, 0.35)`.
- **Focus ring** (`box-shadow: 0 0 0 3px rgba(232, 107, 58, 0.15)`): Form fields on focus, with coral border.

### Named Rules
**The Earned Depth Rule.** Shadows appear only as a response to hover or focus. Nothing floats at rest.

## 5. Components

Tactile and confident: things respond like physical objects. Spring easing `cubic-bezier(0.34, 1.56, 0.64, 1)` for press states, smooth `cubic-bezier(0.4, 0, 0.2, 1)` for everything else.

### Buttons
- **Shape:** Fully rounded pill (border-radius 9999px)
- **Primary:** Sunset Coral background, Cream text, Space Grotesk semibold, padding 10px 20px (py-2.5 px-5)
- **Hover / Focus:** Shimmer sweep (`.btn-shimmer`, 0.5s diagonal light pass), scale 1.04 on hover, scale 0.96 on tap via spring
- **No secondary button system exists yet**; if one is needed, derive it (likely ink outline pill) rather than inventing off-system

### Cards / Containers
- **Corner Style:** Rounded (radius from Tailwind defaults in use)
- **Background:** Cream surfaces with ink hairline borders (ink at 8% opacity)
- **Shadow Strategy:** Earned Depth Rule; rest whisper to hover lift with coral-tint border
- **Internal Padding:** Generous; gutters 24px mobile / 40px desktop

### Inputs / Fields
- **Style:** `.field` class; border with smooth 180ms transitions
- **Focus:** Coral border + 3px coral glow ring at 15% opacity; no default outline
- **Autofill:** Forced chalk background and ink text (WebKit override in place)

### Navigation
- **Style:** Fixed header, 64px tall, transparent over the dark hero, chalk at 95% with backdrop blur + ink hairline after 60px scroll
- **Logo:** "mr.sogood" in Archivo with coral "so"
- **Links:** Space Grotesk medium, ink at 75% to full ink on hover, with a 1.5px coral underline sliding in over 220ms
- **Mobile:** Spring-animated hamburger morphing to X; height-animated dropdown panel, staggered link entrance
- **Entrance:** Header drops in from above (y -80 to 0) at 0.2s delay; links stagger in at 80ms intervals

### Signature Component: The Marquee
A horizontally scrolling text strip (25s linear loop, translateX 0 to -50%) for brand energy moments. Use sparingly, once per page at most.

## 6. Do's and Don'ts

### Do:
- **Do** make Sunset Coral (#E86B3A) the only attention-demanding color per The One Voice Rule.
- **Do** use spring easing (cubic-bezier(0.34, 1.56, 0.64, 1)) for press and toggle states, smooth (0.4, 0, 0.2, 1) for transitions.
- **Do** keep dark sections as `bg-ink noise-overlay` only.
- **Do** provide a prefers-reduced-motion alternative for every animation; the global kill switch in index.css must keep working.
- **Do** keep body text at >=4.5:1 contrast; ink at 75% opacity on chalk is the floor for secondary text.
- **Do** set display type with `text-wrap: balance` and test headline copy at every breakpoint.

### Don't:
- **Don't** build the "generic AI/SaaS template": Inter, purple gradients, identical icon-card grids, or tiny uppercase eyebrow labels above sections (quoted from PRODUCT.md anti-references).
- **Don't** look like a "corporate agency site"; this is one person with a real voice, no "we synergize" energy.
- **Don't** introduce cream/sand/parchment surfaces; the warm-neutral band is retired. Light surfaces are Chalk #F7F6F3 or white only. Warmth lives in coral, type, and imagery.
- **Don't** add experimental scroll-jacking or WebGL flourish; "overdesigned portfolio art piece" is a named anti-reference. A dentist must understand every page in five seconds.
- **Don't** add animated coral glow blobs to dark sections. Ever.
- **Don't** add a third typeface, side-stripe borders, gradient text, or glassmorphism.
- **Don't** use em-dashes in any on-site copy.
