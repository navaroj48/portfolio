# Portfolio readability and accessibility audit

Completed: 30 October 2026 (Asia/Calcutta).

The approved graphite/electric-blue design, typography families, section order, artwork, portfolio copy, URLs, and resume were preserved. No dependencies were added.

## Verified issues and corrections

| Severity | Verified issue | Targeted correction |
| --- | --- | --- |
| High | Body and project descriptions used 12-14px text; controls and metadata used 9-12px; mobile illustration labels reached 6px. | Shared rem-based scale: 16px body, 15px controls, 14px supporting copy and technology tags, 12px compact labels at the default root size. Removed mobile rules that shrank text below this scale. |
| Medium | White primary-button text on #456bff measured 4.37:1. | Slightly darkened the button blue to #3d60ef: 5.10:1. Applied the same correction to text selection. |
| Medium | The generic filter hover rule had higher specificity than the selected-state rule, producing an unreadable selected button on hover. | Restricted hover background styling to unselected filters. Verified selected hover states in the browser. |
| Medium | Several text links and the theme toggle had small hit areas. | Added 44px minimum-height targets to navigation, filters, project links, supporting links, and contact links; enlarged the theme toggle to 44px square. |
| Medium | Filter results changed without a live announcement. | Added a polite atomic status region with the visible project count and category. Verified the status text updates in the browser accessibility tree. |
| Medium | The contact heading clipped the word "something" at 320px. | Replaced the fixed mobile heading size with a responsive clamp and proportional letter spacing. Retested at 320px in both themes. |
| Low | Enlarged illustration labels overlapped at narrow widths. | Repositioned the affected node and placed illustration captions in a wrapping footer within the existing frame. |

The main skip-link destination is now programmatically focusable. Long text and grid children can shrink or wrap without forcing their containers wider. The mobile menu can scroll in a short viewport. Existing reduced-motion support and animations were retained.

## Verification performed

- Rendered browser inspection using the existing VS Code integrated browser and device emulation: 320px, 375px, 768px, and 1280px widths. Coverage included the hero, projects, About, skills, experience, education, certifications, hackathons, contact, navigation, and footer. This was targeted coverage across sizes, not every section at every width.
- Both themes inspected; saved light-theme preference survived reload, and the preview was returned to dark mode.
- Project filters exercised in the browser: AI = 3 projects, full-stack = 3, all = 4. Result announcements were confirmed in the accessibility tree. Keyboard activation and visible focus were checked.
- Mobile navigation opened and closed through section navigation. Keyboard skip navigation reached #main, and the next Tab reached the project controls with a visible focus outline.
- Browser developer console: 0 messages and No Issues at inspection after the tested interactions.
- JavaScript syntax: `node --check script.js` passed.
- Node VM regression checks passed for filters, result announcements, menu close on navigation/outside click/Escape/viewport change, Escape focus restoration, theme persistence, unavailable localStorage, current year, and IntersectionObserver/fallback behavior. These are isolated logic checks, not browser automation or screen-reader tests.
- HTML parser checks passed for nesting, unique IDs, valid internal anchors, preserved text, and unchanged link destinations against the pre-audit snapshot.
- CSS parsed without rule or declaration errors using the already available tinycss2 parser. No sub-12px font declarations remain.
- Calculated normal-text contrast checks passed for the primary button, body text, muted text, and accent text on their principal surfaces in both themes (all >= 4.5:1).
- Local preview, stylesheet, script, and resume HTTP responses checked successfully. No framework build or existing lint/test suite is configured in this static repository.

## Limits

This is not a full WCAG conformance assessment. No real-device, Safari/Firefox, 200% browser-zoom, assistive-technology speech, or performance benchmark testing was performed. Reduced-motion behavior was verified in source rather than by changing the operating-system preference. External certificate/repository/demo destinations were preserved; their remote availability was not exhaustively tested. Email and telephone destinations were inspected without initiating contact. The final illustration positioning adjustment was source-checked but was not separately recaptured at the narrowest width after reloading; the desktop illustration was visually inspected.
