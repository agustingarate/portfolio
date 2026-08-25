---
name: Lumina Editorial
colors:
  surface: '#fbfaee'
  surface-dim: '#dbdbcf'
  surface-bright: '#fbfaee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4e8'
  surface-container: '#efeee3'
  surface-container-high: '#e9e9dd'
  surface-container-highest: '#e4e3d7'
  on-surface: '#1b1c15'
  on-surface-variant: '#464557'
  inverse-surface: '#303129'
  inverse-on-surface: '#f2f1e5'
  outline: '#777589'
  outline-variant: '#c7c4da'
  surface-tint: '#4d34ff'
  primary: '#3300e0'
  on-primary: '#ffffff'
  primary-container: '#4c32ff'
  on-primary-container: '#d7d3ff'
  inverse-primary: '#c4c0ff'
  secondary: '#605a7c'
  on-secondary: '#ffffff'
  secondary-container: '#ded5fd'
  on-secondary-container: '#615b7c'
  tertiary: '#832400'
  on-tertiary: '#ffffff'
  tertiary-container: '#ac3200'
  on-tertiary-container: '#ffccbd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3dfff'
  primary-fixed-dim: '#c4c0ff'
  on-primary-fixed: '#120068'
  on-primary-fixed-variant: '#3400e2'
  secondary-fixed: '#e6deff'
  secondary-fixed-dim: '#cac1e8'
  on-secondary-fixed: '#1c1735'
  on-secondary-fixed-variant: '#484263'
  tertiary-fixed: '#ffdbd0'
  tertiary-fixed-dim: '#ffb59e'
  on-tertiary-fixed: '#3a0b00'
  on-tertiary-fixed-variant: '#842400'
  background: '#fbfaee'
  on-background: '#1b1c15'
  surface-variant: '#e4e3d7'
  surface-cream: '#F5F3E7'
  surface-gray: '#F0F0F0'
  accent-blue: '#D0E8FF'
  accent-green: '#DFF6F0'
  accent-coral: '#FFD8D8'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 72px
    fontWeight: '600'
    lineHeight: 80px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
    letterSpacing: 0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

The design system is crafted for a software developer portfolio that prioritizes product thinking and mobile expertise. The brand personality is **sophisticated, approachable, and intellectually curious**. It balances the precision of engineering with the warmth of a high-end editorial publication.

The chosen design style is **Modern Editorial with Soft Organicism**. It moves away from the rigid "dashboard" aesthetic of typical developer tools in favor of:

- **Spaciousness:** Large white-space areas that let the code and case studies breathe.
- **Fluidity:** Soft transitions and sinuous layouts that mimic natural movement.
- **Warmth:** A foundation of off-whites and creams that feel more "paper-like" and premium than clinical pure white.
- **Subtlety:** Using pastels not as loud calls to action, but as soft identifiers for different categories of expertise (e.g., Engineering, AI, Design).

## Colors

The palette is built on a **warm-neutral foundation** to establish a "studio" feel. The primary brand color (a deep, intellectual blue-purple) is used sparingly for interactive highlights and core branding.

- **Backgrounds:** Use `#FDFCF0` (Warm White) as the primary canvas. Use `#F5F3E7` (Cream) for section backgrounds and card containers to create soft depth.
- **Accents:** The pastel palette (`Lila`, `Blue`, `Green`, `Coral`) should be used for categorical tagging or background washes behind product screenshots.
- **Typography:** Avoid pure black. Use a very deep charcoal for body text to maintain the warm, accessible feel.

## Typography

The typography strategy focuses on **high-end legibility and characterful hierarchy**.

- **Headlines:** Hanken Grotesk provides a modern, sharp edge that suggests engineering precision. Headlines should have slightly tighter tracking for a professional, editorial look.
- **Body:** Inter is used for its exceptional readability in technical contexts. We increase the line-height (1.6x) and add a tiny amount of tracking to ensure the "warm" feeling is maintained in long-form text.
- **Labels:** Geist is used for "meta" information (dates, technologies, AI tags) to inject a subtle technical/monospaced flavor without breaking the editorial flow.

## Layout & Spacing

The layout philosophy follows a **Fluid Editorial Grid**. While the structural skeleton uses a 12-column system, elements should often "break" the grid or use asymmetrical offsets to feel organic and curated.

- **Asymmetry:** Pair large headlines on the left with smaller descriptions on the right, leaving significant whitespace below.
- **Vertical Spacing:** Use generous padding (120px+) between sections to emphasize the "warm" and "calm" sentiment.
- **Mobile:** Transition to a single-column layout with 20px margins, but maintain the large heading sizes (scaled appropriately) to keep the bold editorial impact.

## Elevation & Depth

This design system avoids traditional shadows. Depth is achieved through **Tonal Layering and Surface Differentiation**.

- **Stacked Tones:** Elements "lift" off the page by transitioning from the primary background (`#FDFCF0`) to a container background (`#F5F3E7` or `#F0F0F0`).
- **Soft Borders:** Use very thin, low-contrast borders (1px, 10% opacity black) to define edges only where necessary.
- **Glassmorphism:** For floating navigation or mobile menus, use a high-blur (20px) backdrop filter with a 70% opaque `#FDFCF0` tint to maintain warmth while showing the content beneath.

## Shapes

The shape language is **exuberantly rounded**. To counter the "coldness" of software engineering, all interactive and container elements use large radii.

- **Containers:** Main content cards and project wrappers must use at least `24px` (rounded-xl) or `32px` corner radii.
- **Interactive Elements:** Buttons and tags should be fully pill-shaped.
- **Visuals:** Any background decorative elements or image masks should utilize sinuous, organic curves rather than perfect circles or rectangles.

## Components

- **Buttons:** Primary buttons are pill-shaped with a background of the primary color and white text. Secondary buttons use a "ghost" style with a 1px border and a subtle cream hover state.
- **Project Cards:** Large, edge-to-edge image containers with `32px` rounded corners. Typography should overlay the image on a soft gradient or be placed immediately below in a clear, editorial list format.
- **Chips/Tags:** Use the pastel accent palette. A "Mobile" tag might be `accent-blue`, while "AI/ML" might be `accent-lila`. Text inside should be `label-caps`.
- **Input Fields:** Minimalist design with only a bottom border or a very soft cream background fill. Large, clear focus states using the primary color.
- **Lists:** Use wide horizontal padding and soft dividers. Each list item should feel like a row in a premium index.
- **Navigation:** A floating, pill-shaped dock at the bottom of the screen (mobile-first influence) or a very clean, high-set header with plenty of vertical breathing room.
