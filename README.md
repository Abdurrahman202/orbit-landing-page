# ORBIT — Responsive Product Landing Page

Task 1 of the Auspify Technologies Frontend Developer Internship.

## Overview

ORBIT is a responsive landing page for a fictional smart desk companion. The concept combines a focus timer, soft lighting, and reminders to pause. The website presents the product through a dark sage theme, a layered CSS 3D illustration, and interactive colour options.

This is a frontend concept demonstration. The product is not available for purchase, and the displayed 25:00 timer is decorative, not a working countdown.

## Technologies

- HTML5 for content and page structure.
- CSS3 for styling, responsive layouts, 3D transforms, and animations.
- Vanilla JavaScript for navigation, scroll reveals, product tilt, and colour selection.
- Local Storage to remember the selected product finish when browser storage is available.

No framework, build process, external API, or backend is required.

## Features

- Responsive navigation and mobile menu.
- Hero section with calls to action.
- Layered CSS product illustration with floating animation and mouse-controlled tilt.
- Feature cards and a three-step product usage section.
- Sage, Sand, and Graphite finish selection.
- Scroll entrance animations and hover effects.
- Keyboard focus indicators, a skip link, and labelled controls.
- Support for the visitor's reduced-motion preference.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Page structure and content |
| `style.css` | Styling, animation, and responsive layouts |
| `script.js` | Interactive behaviour |
| `README.md` | Project documentation |
| `screenshots/desktop-home.png` | Desktop homepage screenshot |
| `screenshots/mobile-home.png` | Mobile homepage screenshot |
| `screenshots/features.png` | Feature section screenshot |

## Run locally

1. Download or copy the project folder.
2. Keep `index.html`, `style.css`, and `script.js` in the same folder.
3. Open `index.html` in a modern browser.

Alternatively, open the folder in VS Code and use Live Server if installed. Serving the page through a local server gives Local Storage a consistent origin.

## Review checklist

Mark each item only after checking it in your browser. These boxes are a manual checklist, not a claim of completed automated testing.

- [x] Navigation links scroll to the correct sections.
- [x] The mobile menu opens and closes, including with Escape.
- [x] The page fits at 390 px and 320 px widths without clipped content.
- [x] All sections remain readable on desktop, tablet, and mobile.
- [x] The product tilts with a mouse and returns to its default angle.
- [x] Each colour button updates the product finish and selected label.
- [x] The chosen finish remains after refresh when storage is available.
- [x] Keyboard users can reach and operate links and buttons.
- [x] Reduced-motion settings disable animations.
- [x] The browser console shows no JavaScript errors.
- [x] Submission screenshots are included in the screenshots folder.

## Task requirements covered by the implementation

| Requirement | Implementation |
| --- | --- |
| HTML page structure | Header, main sections, and footer |
| CSS styling | Consistent colours, typography, cards, and buttons |
| Responsive design | Grid, Flexbox, and media queries |
| Navigation and calls to action | Section links and exploration buttons |
| Mobile and desktop optimisation | Adaptive layouts, mobile menu, and pointer-aware interactions |

## Credits

Prepared by Abdurrahman Hilmy with AI-assisted guidance and code generation. The product illustration is built from HTML and CSS rather than an external image or 3D model.
