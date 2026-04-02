import React, { useState } from "react";
import "./App.css";

// Data
import { RECIPE_LIBRARY } from "./data/recipes";

// Hooks
import { usePantry } from "./hooks/usePantry";
import { useGroceryList } from "./hooks/useGroceryList";
import { useMealPlanner } from "./hooks/useMealPlanner";
import { useCookMode } from "./hooks/useCookMode";
import { useRecipes } from "./hooks/useRecipes";

// Components
import WelcomeModal from "./components/WelcomeModal";
import TopBar from "./components/TopBar";
import PantrySidebar from "./components/PantrySidebar";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import GroceryList from "./components/GroceryList";
import MealPlanner from "./components/MealPlanner";
import CookMode from "./components/CookMode";
import MobileNav from "./components/MobileNav";

function App() {
  // --- UI State ---
  const [servings, setServings] = useState(4);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileTab, setMobileTab] = useState("recipes");
  const [showWelcome, setShowWelcome] = useState(() => {
    return !localStorage.getItem("instacook_welcomed");
  });

  // --- Hooks ---
  const pantry = usePantry();
  const grocery = useGroceryList();
  const planner = useMealPlanner();
  const cook = useCookMode();
  const recipes = useRecipes(pantry.pantryState, servings, pantry.allPantryItems);

  // --- Handlers ---
  const dismissWelcome = (goToPantry) => {
    localStorage.setItem("instacook_welcomed", "true");
    setShowWelcome(false);
    if (goToPantry) setMobileTab("pantry");
  };

  const handleAddToPlan = (recipe) => {
    planner.setPlannerAddRecipe(recipe);
    planner.setShowPlanner(true);
  };

  const handleAddMissingToGrocery = (recipe) => {
    const items = recipes.addMissingToGrocery(recipe);
    grocery.addItemsToGrocery(items);
  };

  const handleAddPlanToGrocery = () => {
    const allRecipeNames = Object.values(planner.mealPlan).flat();
    const uniqueNames = [...new Set(allRecipeNames)];
    const allMissing = [];
    uniqueNames.forEach(name => {
      const recipe = RECIPE_LIBRARY.find(r => r.name === name);
      if (recipe) {
        const analysis = recipes.getRecipeAnalysis(recipe);
        analysis.missing.forEach(m => {
          if (!allMissing.find(x => x.name === m.name)) {
            allMissing.push({ name: m.name, checked: false });
          }
        });
      }
    });
    grocery.addItemsToGrocery(allMissing);
  };

  return (
    <div className={`app ${darkMode ? "dark" : ""}`}>
      {showWelcome && (
        <WelcomeModal
          onSetupPantry={() => dismissWelcome(true)}
          onSkip={() => dismissWelcome(false)}
        />
      )}

      <TopBar
        searchTerm={recipes.searchTerm}
        setSearchTerm={recipes.setSearchTerm}
        servings={servings}
        setServings={setServings}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenPlanner={() => planner.setShowPlanner(true)}
        plannerTotalMeals={planner.plannerTotalMeals}
        onSurprise={recipes.getSurprise}
        aiLoading={recipes.aiLoading}
      />

      <div className="layout">
        <PantrySidebar
          mobileTab={mobileTab}
          pantryState={pantry.pantryState}
          pantrySearch={pantry.pantrySearch}
          setPantrySearch={pantry.setPantrySearch}
          filteredCatalog={pantry.filteredCatalog}
          collapsedCats={pantry.collapsedCats}
          toggleCategory={pantry.toggleCategory}
          togglePantryItem={pantry.togglePantryItem}
          updatePantryQty={pantry.updatePantryQty}
          selectAllCat={pantry.selectAllCat}
        />

        <RecipeList
          mobileTab={mobileTab}
          cuisineFilter={recipes.cuisineFilter}
          setCuisine={recipes.setCuisine}
          asianSubFilter={recipes.asianSubFilter}
          setAsianSubFilter={recipes.setAsianSubFilter}
          medSubFilter={recipes.medSubFilter}
          setMedSubFilter={recipes.setMedSubFilter}
          favoritesOnly={recipes.favoritesOnly}
          setFavoritesOnly={recipes.setFavoritesOnly}
          difficultyFilter={recipes.difficultyFilter}
          setDifficultyFilter={recipes.setDifficultyFilter}
          favorites={recipes.favorites}
          toggleFavorite={recipes.toggleFavorite}
          aiLoading={recipes.aiLoading}
          aiSuggestion={recipes.aiSuggestion}
          canMakeRecipes={recipes.canMakeRecipes}
          missingRecipes={recipes.missingRecipes}
          selectedRecipe={recipes.selectedRecipe}
          setSelectedRecipe={recipes.setSelectedRecipe}
          setMobileTab={setMobileTab}
        />

        <aside className={`right-panel ${mobileTab === "detail" || mobileTab === "grocery" ? "mobile-active" : ""}`}>
          <RecipeDetail
            mobileTab={mobileTab}
            selectedRecipe={recipes.selectedRecipe}
            favorites={recipes.favorites}
            toggleFavorite={recipes.toggleFavorite}
            pantryState={pantry.pantryState}
            getScaledIngredients={recipes.getScaledIngredients}
            getRecipeAnalysis={recipes.getRecipeAnalysis}
            startCooking={cook.startCooking}
            onAddToPlan={handleAddToPlan}
            onAddMissingToGrocery={handleAddMissingToGrocery}
          />
          <GroceryList
            mobileTab={mobileTab}
            groceryList={grocery.groceryList}
            groceryByCategory={grocery.groceryByCategory}
            toggleGroceryCheck={grocery.toggleGroceryCheck}
            removeGroceryItem={grocery.removeGroceryItem}
            clearDone={grocery.clearDone}
            clearAll={grocery.clearAll}
          />
        </aside>

        <MobileNav mobileTab={mobileTab} setMobileTab={setMobileTab} />
      </div>

      <MealPlanner
        mealPlan={planner.mealPlan}
        showPlanner={planner.showPlanner}
        plannerMonth={planner.plannerMonth}
        setPlannerMonth={planner.setPlannerMonth}
        plannerAddRecipe={planner.plannerAddRecipe}
        setPlannerAddRecipe={planner.setPlannerAddRecipe}
        plannerView={planner.plannerView}
        setPlannerView={planner.setPlannerView}
        plannerSelectedDay={planner.plannerSelectedDay}
        setPlannerSelectedDay={planner.setPlannerSelectedDay}
        plannerTotalMeals={planner.plannerTotalMeals}
        addToPlan={planner.addToPlan}
        removeFromPlan={planner.removeFromPlan}
        clearPlan={planner.clearPlan}
        getCalendarDays={planner.getCalendarDays}
        getWeekDays={planner.getWeekDays}
        closePlanner={planner.closePlanner}
        addPlanToGrocery={handleAddPlanToGrocery}
        setSelectedRecipe={recipes.setSelectedRecipe}
        setShowPlanner={planner.setShowPlanner}
        setMobileTab={setMobileTab}
      />

      <CookMode
        cookMode={cook.cookMode}
        cookStep={cook.cookStep}
        cookPhase={cook.cookPhase}
        setCookPhase={cook.setCookPhase}
        timerSeconds={cook.timerSeconds}
        setTimerSeconds={cook.setTimerSeconds}
        timerRunning={cook.timerRunning}
        setTimerRunning={cook.setTimerRunning}
        timerInput={cook.timerInput}
        setTimerInput={cook.setTimerInput}
        timerRef={cook.timerRef}
        closeCooking={cook.closeCooking}
        goToStep={cook.goToStep}
        formatTime={cook.formatTime}
        getScaledIngredients={recipes.getScaledIngredients}
        servings={servings}
      />
    </div>
  );
}

export default App;
