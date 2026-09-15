# Accessibility Audit Report: Portfolio - Interactive Gantt Bubble Scale on Scroll

**Screen Target:** {{DATA:SCREEN:SCREEN_2}}
**Date:** October 26, 2024
**Compliance Goal:** WCAG 2.1 Level AA

---

## 1. Executive Summary

The portfolio screen demonstrates a high level of visual polish and interactive depth. However, the heavy reliance on custom JavaScript for scroll-locking (Gantt section) and WebGL shaders presents specific accessibility challenges, particularly for keyboard users and those with motion sensitivities.

---

## 2. Detailed Findings

### A. Semantic Structure & Navigation

- **Finding:** The page uses a logical heading hierarchy (H1, H2, H3), which is excellent for screen reader navigation.
- **Issue:** The custom Gantt chart section (`#project-lifecycle`) relies on scroll-jacking to progress through phases. This often breaks standard keyboard navigation (Tab/Shift+Tab) and can confuse users who expect linear scrolling.
- **Recommendation:** Ensure that as the "day selector" moves via scroll, the corresponding descriptions receive focus or are announced via `aria-live="polite"`.

### B. Color & Contrast

- **Finding:** The "Lumina Editorial" design system generally uses high-contrast text.
- **Issue:** The active navigation link in blue (#4c32ff) against the light surface (#fbfaee) has a contrast ratio of approximately 6.5:1, which passes AA. However, some secondary descriptions in 'surface-variant' might dip below the 4.5:1 threshold for small text.
- **Recommendation:** Verify contrast for the Gantt phase descriptions during their "inactive" or "faded" states.

### C. Motion & Interactivity

- **Finding:** The screen features a WebGL hero shader and a cursor-following light.
- **Issue:** Users with vestibular disorders may find the constant motion and the global cursor-light distracting or nauseating.
- **Recommendation:** Implement a "Reduced Motion" check in CSS/JS. If `(prefers-reduced-motion: reduce)` is detected, the shader animation should pause or simplify, and the cursor light should be disabled.

### D. Images & Alternative Text

- **Finding:** Decorative icons are used in the "Servicios" and "Stack" sections.
- **Issue:** Many icons are implemented as SVGs without `aria-hidden="true"`, which can cause screen readers to announce "Image" without context.
- **Recommendation:** Add `aria-hidden="true"` to decorative icons and ensure the CTA button ("Hablemos") has a clear, descriptive label.

---

## 3. Actionable Checklist

1. [ ] **Add `prefers-reduced-motion` support:** Wrap shader updates and scroll-triggered animations in a check for user motion preferences.
2. [ ] **ARIA Live Regions:** Apply `aria-live="polite"` to the Gantt description container so updates are announced as the user scrolls.
3. [ ] **Focus Management:** Ensure the "Hablemos" button and all project links have visible `:focus-visible` styles (currently relies on hover).
4. [ ] **Skip Link:** Add a "Skip to Content" link at the very top of the DOM to bypass the sticky navigation.

---

## 4. Conclusion

The site is structurally sound but requires "progressive enhancement" for accessibility. By addressing motion sensitivity and keyboard-friendliness in the interactive Gantt section, the portfolio will be truly inclusive.
