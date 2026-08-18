# Movie Picker Experience Design

Document status: Approved design baseline  
Related specification: [REQUIREMENTS.md](./REQUIREMENTS.md)  
Last updated: 2026-08-18

## 1. Experience principles

### One clear decision

The picker keeps attention on active filters and one primary action. Secondary actions support the decision without competing with it.

### Explain every state

The interface always communicates whether movies are loading, available, filtered out, selected, unavailable, or failed.

### Preserve user control

Randomness determines the movie, not the available set. Active filters and the eligible count make the selection boundary visible.

### Accessible by default

Labels, headings, focus, keyboard interaction, status announcements, contrast, and responsive layout form part of the primary experience.

Design IDs connect interface decisions with requirements, implementation tasks, and validation scenarios.

## 2. Site map

```text
Application shell
├── Picker (/)
│   ├── Filter controls
│   ├── Eligible count
│   └── Selection result
├── Favorites (/favorites)
│   └── Favorite movie collection
└── Not found (*)
    └── Return-to-picker action
```

- **DES-IA-001 · Essential:** The global header contains the product name, Picker link, and Favorites link.
- **DES-IA-002 · Important:** The active route is identifiable through text, an indicator, or `aria-current`, not color alone.
- **DES-IA-003 · Important:** The Favorites link displays the saved count when it is greater than zero.
- **DES-IA-004 · Important:** Main content begins after a skip link and uses a stable `main` landmark.

## 3. Picker page

### Content hierarchy

1. Page title: “Find a movie”.
2. Supporting sentence explaining the selection process.
3. Search and genre controls.
4. Active-filter summary with a clear action when filters exist.
5. Eligible result count.
6. Primary pick action.
7. Result region showing guidance, progress, failure, or a selected movie.

### Desktop concept

```text
┌─────────────────────────────────────────────────────────────┐
│ Movie Picker                 Picker     Favorites (2)       │
├─────────────────────────────────────────────────────────────┤
│ Find a movie                                               │
│ Narrow the choices, then let Movie Picker decide.          │
│                                                            │
│ [ Search by title........ ] [ Genre: All ▾ ] [Clear]       │
│ 14 movies match                                            │
│ [ Pick a movie ]                                           │
│                                                            │
│ ┌───────────┐  Selected for you                            │
│ │  poster   │  Movie title (2024)                          │
│ │           │  Drama · Mystery                             │
│ └───────────┘  Synopsis...  [Add to favorites] [Pick again]│
└─────────────────────────────────────────────────────────────┘
```

### Mobile concept

```text
┌──────────────────────────┐
│ Movie Picker        Menu │
├──────────────────────────┤
│ Find a movie             │
│ Supporting text          │
│ [Search...............]  │
│ [Genre: All..........▾]  │
│ [Clear filters]          │
│ 14 movies match          │
│ [   Pick a movie      ]  │
│ ┌──────────────────────┐ │
│ │ poster               │ │
│ │ Movie title          │ │
│ │ year · genres        │ │
│ │ synopsis             │ │
│ │ [Favorite]           │ │
│ │ [Pick again]         │ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

- **DES-PICK-001 · Essential:** Search and genre labels remain visible before, during, and after input.
- **DES-PICK-002 · Essential:** The eligible count updates with filter changes and sits close to the pick action.
- **DES-PICK-003 · Essential:** The pick action becomes unavailable when the eligible count is zero; adjacent text explains the reason.
- **DES-PICK-004 · Important:** Clear filters appears only when at least one filter differs from its initial value.
- **DES-PICK-005 · Important:** A changed filter clears a selected movie that no longer belongs to the eligible set.
- **DES-PICK-006 · Important:** The result region retains a stable location across initial, loading, selected, empty, and error states.
- **DES-PICK-007 · Important:** Pick again remains secondary to the selected movie content and favorite action.

## 4. Favorites page

The page starts with the “Favorites” heading and a short description. Saved movies appear in a responsive card collection. Each card includes current catalogue details and a movie-specific remove action.

- **DES-FAV-001 · Essential:** Removing a favorite updates the collection and header count immediately.
- **DES-FAV-002 · Essential:** The empty page includes explanatory text and a prominent link to the picker.
- **DES-FAV-003 · Important:** Focus remains predictable after removal, moving to the next logical control or the empty-state action.
- **DES-FAV-004 · Important:** Card order stays stable between renders. The initial implementation follows catalogue order.

## 5. Movie presentation

The selected movie uses the most prominent card treatment. Its title is a heading, metadata follows directly beneath it, and the synopsis uses a comfortable line length. Poster and text use adjacent columns on wide screens and one column on narrow screens.

Favorite collection cards use the same content vocabulary at a smaller scale. Shared primitives keep favorite controls, poster fallbacks, metadata formatting, and heading structure consistent.

- **DES-MOVIE-001 · Essential:** Every rendered movie action targets the stable movie ID.
- **DES-MOVIE-002 · Essential:** Favorite controls announce both action and movie, for example “Add Inception to favorites”.
- **DES-MOVIE-003 · Important:** Release year and genres appear as text rather than information conveyed only through icons.
- **DES-MOVIE-004 · Important:** Synopsis text wraps naturally and stays within its card.
- **DES-MOVIE-005 · Important:** Poster containers use a consistent aspect ratio and reserved dimensions.
- **DES-MOVIE-006 · Important:** A poster failure swaps to a local fallback without repeated network retries.

## 6. State design

| State | Visible content | Primary action | Assistive behavior |
| --- | --- | --- | --- |
| Initial | Guidance and eligible count | Pick a movie | No unsolicited announcement |
| Catalogue loading | Loading message or indicator | Temporarily unavailable | Polite status announcement |
| Empty catalogue | No movies available explanation | Retry when applicable | Heading and explanation |
| No filter matches | No matches explanation | Clear filters | Updated count announced |
| Selecting | Stable layout with progress feedback | Temporarily unavailable | Polite status announcement |
| Selected | Complete movie result | Favorite or pick again | Result announced without forced focus |
| Catalogue error | Plain-language error | Retry | Alert announced once |
| Storage recovery | Application remains usable | Continue | Non-blocking message when useful |

- **DES-STATE-001 · Essential:** Contradictory states do not appear together, such as loading beside no results.
- **DES-STATE-002 · Essential:** Error states include a useful next step and omit technical internals.
- **DES-STATE-003 · Essential:** Async failure leaves the application shell and navigation intact.
- **DES-STATE-004 · Important:** Progress indicators avoid rapid flashing for operations that complete immediately.

## 7. Component inventory

| Component | Responsibility | Key inputs |
| --- | --- | --- |
| `AppShell` | Header, navigation, main landmark, error boundary | favorite count, route content |
| `FilterPanel` | Search, genre, clear action | filters, genres, callbacks |
| `ResultCount` | Eligible collection summary | count, active filters |
| `PickAction` | Starts selection and explains disabled state | count, busy state, callback |
| `MovieCard` | Shared movie presentation | movie, variant, favorite state |
| `FavoriteButton` | Accessible favorite toggle | movie ID, title, state, callback |
| `Poster` | Image dimensions and fallback handling | source, title, size variant |
| `StatusPanel` | Guidance, loading, empty, and error states | state, message, recovery action |
| `PickerPage` | Picker feature composition | application services/hooks |
| `FavoritesPage` | Favorite collection composition | favorites and catalogue |
| `NotFoundPage` | Unknown-route recovery | picker link |

- **DES-COMP-001 · Important:** Shared components accept domain data and callbacks rather than reading browser storage directly.
- **DES-COMP-002 · Important:** Variants represent genuine visual roles; one-off Boolean combinations do not accumulate into an unclear API.
- **DES-COMP-003 · Important:** Accessible names originate from visible content where possible.

## 8. Visual system

CSS custom properties cover surface and text colors, semantic action colors, spacing, typography, borders, radii, shadows, content widths, breakpoints, and motion.

- **DES-VIS-001 · Important:** Components consume shared tokens instead of repeating arbitrary visual values.
- **DES-VIS-002 · Essential:** Default, hover, active, focus-visible, and disabled control states remain distinguishable.
- **DES-VIS-003 · Essential:** Focus-visible styling has adequate contrast and is never removed without replacement.
- **DES-VIS-004 · Important:** Text content uses a readable line length near 45–75 characters on wide screens.
- **DES-VIS-005 · Essential:** Generated Nx welcome content and placeholder routes do not appear in the product experience.

## 9. Responsive behavior

- **DES-RWD-001 · Essential:** Viewports below 640 px use a single-column flow with no page-level horizontal scrolling.
- **DES-RWD-002 · Important:** At 640 px and above, controls may share a row when labels and touch targets remain clear.
- **DES-RWD-003 · Important:** At 900 px and above, the selected poster and details may use adjacent columns.
- **DES-RWD-004 · Important:** Interactive targets are approximately 44 by 44 CSS pixels or provide equivalent spacing.
- **DES-RWD-005 · Important:** Navigation remains accessible at every width; a collapsed menu retains keyboard operation and clear focus management.

## 10. Interaction and accessibility

- **DES-A11Y-001 · Essential:** Page routes expose one descriptive `h1` and a logical heading sequence.
- **DES-A11Y-002 · Essential:** Keyboard order follows the visual reading order.
- **DES-A11Y-003 · Essential:** Route changes place focus on the page heading or use an equivalent announced route-change pattern.
- **DES-A11Y-004 · Essential:** Status updates use polite announcements; failures requiring immediate attention use an alert announced once.
- **DES-A11Y-005 · Important:** Animation honors `prefers-reduced-motion` and never carries the only indication of state.
- **DES-A11Y-006 · Important:** Automated tests query controls by role, name, label, and visible text rather than styling hooks.

## 11. Content guidance

- Buttons begin with verbs: “Pick a movie”, “Pick again”, “Add to favorites”, “Remove from favorites”, “Clear filters”, and “Try again”.
- Empty and error messages explain both the situation and the next useful action.
- Technical terms such as repository, adapter, payload, exception, and local storage stay out of user-facing copy.
- Counts read naturally: “1 movie matches” and “12 movies match”.

## 12. Design validation

Design validation covers the primary journeys on desktop and mobile viewports. It includes keyboard-only operation, screen-reader semantics, loading and recovery states, long titles and synopses, missing posters, empty collections, and large catalogues. Usability sessions focus on whether a first-time visitor can filter, pick, save, and revisit a movie without additional instruction.
