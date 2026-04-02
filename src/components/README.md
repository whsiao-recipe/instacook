# InstaCook — Refactored File Structure

Your original `App.js` (7,854 lines) has been split into 17 focused files.

## How to use these files

1. In your project, create the folder structure below inside `src/`
2. Replace your existing `App.js` and `App.css` with the new versions
3. Everything else is new files — just drop them in

## Structure

```
src/
├── App.js                    (208 lines — thin shell, wires everything together)
├── App.css                   (unchanged)
│
├── data/
│   ├── recipes.js            (6,692 lines — all recipe data)
│   ├── pantry.js             (61 lines — pantry catalog, cuisines, categories)
│   └── ingredients.js        (142 lines — ingredient config, unit conversions)
│
├── hooks/
│   ├── usePantry.js          (75 lines — pantry state management)
│   ├── useGroceryList.js     (48 lines — grocery list state)
│   ├── useMealPlanner.js     (104 lines — meal planner + calendar logic)
│   ├── useCookMode.js        (96 lines — cook mode + timer)
│   └── useRecipes.js         (151 lines — filtering, analysis, AI surprise)
│
└── components/
    ├── TopBar.js             (45 lines)
    ├── PantrySidebar.js      (67 lines)
    ├── RecipeList.js         (147 lines)
    ├── RecipeDetail.js       (81 lines)
    ├── GroceryList.js        (39 lines)
    ├── MealPlanner.js        (186 lines)
    ├── CookMode.js           (125 lines)
    ├── MobileNav.js          (24 lines)
    └── WelcomeModal.js       (15 lines)
```

## What changed

- **No functionality changes** — the app works exactly the same
- **No CSS changes** — App.css is untouched
- All recipe data moved to `data/recipes.js` (was ~5,000 lines inline)
- All state logic extracted into custom React hooks
- Each UI section is now its own component
- `App.js` is now ~200 lines — just imports and wiring

## Next steps for monetization

- Move `data/recipes.js` into Firebase/Firestore (database instead of JS file)
- Replace `localStorage` calls in hooks with Firebase sync
- Add user auth (Firebase Auth) to hooks
- The component split makes it easy to add premium badges, paywalls, etc.
