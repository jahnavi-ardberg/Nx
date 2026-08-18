# Movie Picker Product Requirements

Document status: Approved product baseline  
Product area: `movie-picker`  
Last updated: 2026-08-18

## 1. Purpose

Movie Picker helps people move from “I do not know what to watch” to one useful recommendation. Users narrow a movie catalogue by title and genre, receive a random choice from the remaining results, and save favorites for later.

This document describes intended product behavior. Requirement IDs provide stable references for planning, implementation, testing, and acceptance.

## 2. Product goals

- Reduce the time required to choose a movie.
- Keep discovery simple enough for a first-time visitor to use without instructions.
- Make every recommendation explainable from the active filters.
- Preserve favorite movies between browser sessions.
- Provide a dependable experience across desktop, mobile, keyboard, and screen-reader use.

## 3. First-release boundaries

The first release focuses on catalogue discovery, random selection, and local favorites. User accounts, social features, payments, streaming playback, provider availability, machine-learning recommendations, user reviews, and administration tools remain outside this release.

## 4. Users and needs

### Casual viewer

Wants a quick answer with as few decisions as possible.

### Selective viewer

Wants to narrow the catalogue by a partial title or genre before asking for a choice.

### Returning viewer

Wants previously saved favorites to remain available after reopening the application.

### Keyboard or assistive-technology user

Needs the complete selection and favorites flows without relying on a pointer, visual-only state, or color alone.

## 5. Core journeys

### Pick from the full catalogue

1. The visitor opens the picker.
2. The page shows the number of eligible movies.
3. The visitor selects **Pick a movie**.
4. One eligible movie appears with enough detail to make a viewing decision.
5. The visitor can pick again without reloading the page.

### Narrow and pick

1. The visitor enters part of a title, chooses a genre, or does both.
2. The eligible count updates to match the combined filters.
3. The picker selects only from that eligible set.
4. A no-match result explains how to recover by changing or clearing filters.

### Save and revisit a favorite

1. The visitor adds a displayed movie to favorites.
2. Favorite state updates wherever that movie is visible.
3. The visitor opens Favorites and sees the saved movie.
4. The saved movie remains after a reload.
5. Removing it updates both Favorites and picker state.

## 6. Functional requirements

### Catalogue

- **REQ-CAT-001 · Essential:** Each catalogue entry has a stable ID, title, release year, one or more genres, synopsis, and poster reference.
- **REQ-CAT-002 · Essential:** Stable IDs drive selection, favorite storage, routes, and rendered list identity. Two movies may share a title without becoming the same entry.
- **REQ-CAT-003 · Essential:** Duplicate IDs are rejected at the data boundary rather than silently overwriting another movie.
- **REQ-CAT-004 · Important:** Missing optional text displays a neutral fallback. An unavailable poster displays a local placeholder and leaves the rest of the card usable.
- **REQ-CAT-005 · Important:** Catalogue loading distinguishes initial loading, success, empty catalogue, and failure.
- **REQ-CAT-006 · Important:** Movie data has a stable order before filters or random selection are applied.

### Search and genre filtering

- **REQ-FILTER-001 · Essential:** Title search uses a case-insensitive partial match and ignores surrounding whitespace.
- **REQ-FILTER-002 · Essential:** Genre filtering includes movies containing the selected genre.
- **REQ-FILTER-003 · Essential:** Title and genre criteria combine with AND behavior; a movie appears only when it satisfies every active criterion.
- **REQ-FILTER-004 · Important:** Genre options come from catalogue genres, remove duplicates, and use a consistent sorted order.
- **REQ-FILTER-005 · Important:** The page shows the current eligible movie count after each filter change.
- **REQ-FILTER-006 · Important:** A single clear action resets all filters to their initial values.
- **REQ-FILTER-007 · Important:** A no-match state contains a plain-language explanation and a clear-filter action.

### Random selection

- **REQ-PICK-001 · Essential:** Every pick comes from the currently eligible movie collection.
- **REQ-PICK-002 · Essential:** An empty eligible collection produces no selection and leaves the pick action unavailable.
- **REQ-PICK-003 · Essential:** A successful result includes title, release year, genres, synopsis, poster or fallback, and favorite state.
- **REQ-PICK-004 · Important:** When at least two movies are eligible, an immediate repeat is avoided.
- **REQ-PICK-005 · Important:** Filter changes that make the current selection ineligible clear that result and explain the changed state.
- **REQ-PICK-006 · Important:** Picking again updates only the result area and does not reload or navigate away from the page.
- **REQ-PICK-007 · Important:** Random index selection gives each eligible entry an equal opportunity.

### Favorites

- **REQ-FAV-001 · Essential:** A movie can be added to or removed from favorites from every full movie presentation.
- **REQ-FAV-002 · Essential:** Favorite state remains consistent across the picker result, navigation count, and Favorites page.
- **REQ-FAV-003 · Essential:** Favorites persist in browser storage as unique movie IDs.
- **REQ-FAV-004 · Essential:** Malformed, outdated, duplicated, or unavailable stored data resolves to a safe valid state without blocking startup.
- **REQ-FAV-005 · Important:** Favorites displays saved movies using current catalogue details.
- **REQ-FAV-006 · Important:** IDs that no longer exist in the catalogue are ignored and removed during the next successful persistence update.
- **REQ-FAV-007 · Important:** An empty Favorites page explains how to add a movie and links back to the picker.

### Navigation and routing

- **REQ-NAV-001 · Essential:** `/` opens the picker and `/favorites` opens saved movies.
- **REQ-NAV-002 · Essential:** Internal navigation uses React Router and retains the single-page application experience.
- **REQ-NAV-003 · Important:** The header exposes Picker and Favorites from each primary page.
- **REQ-NAV-004 · Important:** An unknown path displays a not-found page with a route back to the picker.
- **REQ-NAV-005 · Important:** Browser Back and Forward actions reproduce the expected route without a blank or inconsistent screen.

### Feedback and recovery

- **REQ-FEEDBACK-001 · Essential:** Loading, empty, error, no-match, and selected states never appear as an unexplained blank area.
- **REQ-FEEDBACK-002 · Essential:** Recoverable catalogue failures present a retry action.
- **REQ-FEEDBACK-003 · Important:** Error messages use user-oriented language and omit stack traces, credentials, headers, and internal endpoint details.
- **REQ-FEEDBACK-004 · Important:** Favorite changes produce immediate visible feedback and an assistive-technology announcement.

## 7. Accessibility

- **REQ-A11Y-001 · Essential:** Search, genre selection, picking, navigation, favorite toggling, retry, and filter clearing are fully keyboard operable.
- **REQ-A11Y-002 · Essential:** Every interactive control has an accessible name describing its purpose and, where relevant, the target movie.
- **REQ-A11Y-003 · Essential:** Form controls have persistent programmatic labels; placeholder text acts only as a hint.
- **REQ-A11Y-004 · Essential:** Pages use one descriptive level-one heading followed by a logical heading hierarchy.
- **REQ-A11Y-005 · Essential:** Focus remains visible and moves predictably after route changes and significant actions.
- **REQ-A11Y-006 · Important:** Result counts, selection changes, and favorite changes reach assistive technology without unexpectedly moving focus.
- **REQ-A11Y-007 · Important:** Text, controls, focus indicators, and meaningful graphics meet WCAG 2.2 AA contrast expectations.
- **REQ-A11Y-008 · Important:** Poster images use movie-specific alternative text; decorative imagery uses empty alternative text.

## 8. Quality attributes

### Performance and responsiveness

- **REQ-PERF-001 · Important:** Filtering and selection feel immediate for a catalogue of 1,000 movies on a typical modern phone or laptop.
- **REQ-PERF-002 · Important:** Posters use explicit dimensions and lazy loading below the initial viewport.
- **REQ-PERF-003 · Important:** Production output contains no development-only Nx welcome content or unused sample routes.
- **REQ-COMPAT-001 · Important:** Core flows work in current stable Chromium, Firefox, and WebKit browsers.
- **REQ-COMPAT-002 · Essential:** Content remains usable from a 320 px viewport upward without page-level horizontal scrolling.
- **REQ-COMPAT-003 · Important:** Reduced-motion preferences disable nonessential animation.

### Reliability

- **REQ-REL-001 · Essential:** Invalid external or stored data cannot crash the entire application.
- **REQ-REL-002 · Essential:** A React error boundary provides a recoverable fallback for unexpected rendering failures.
- **REQ-REL-003 · Important:** Selection, filters, and favorites behave deterministically in tests through controlled fixtures and injectable randomness.

### Security and privacy

- **REQ-SEC-001 · Essential:** Browser bundles and repository files contain no credentials, private tokens, or secrets.
- **REQ-SEC-002 · Essential:** Remote and persisted data is validated before reaching application state.
- **REQ-SEC-003 · Essential:** Untrusted HTML is never injected into the page.
- **REQ-SEC-004 · Important:** The application stores favorite IDs only and creates no personal or behavioral profile.
- **REQ-SEC-005 · Important:** External poster references use secure HTTPS sources or local assets.

## 9. Verification

| Area | Primary evidence |
| --- | --- |
| Filtering and selection | Vitest tests for pure domain functions |
| Rendering and interactions | Testing Library tests using roles and labels |
| Routing and complete journeys | Playwright tests in `movie-picker-e2e` |
| Accessibility semantics | Automated checks and keyboard-focused scenarios |
| Build integrity | Nx lint, typecheck, test, build, and e2e targets |
| Responsive experience | Desktop and mobile browser assertions with visual checks |

## 10. Release acceptance

The MVP is ready when each essential outcome has automated evidence, applicable Nx verification targets pass, and this scenario succeeds in Chromium, Firefox, and WebKit:

> Starting with movies from multiple genres, a visitor searches with a partial title and selects a genre. The eligible count reflects both filters. The visitor picks a matching movie, adds it to favorites, reloads, finds it under `/favorites`, removes it, and returns to the picker. No-match filters, malformed stored favorites, a broken poster, and an unknown route each lead to a clear recoverable state.

## 11. Assumptions

- The initial catalogue is bundled with the application and contains valid distribution rights for its text and images.
- Favorites belong to one browser profile and do not synchronize across devices.
- The application runs as a static web application with client-side routing.
- Internet access is optional when catalogue data and poster assets are bundled locally.
- Product analytics and personal-data collection are outside the initial release.
