import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as fromApp from '../../store/app.reducers';
import { RecipeActionsUnion, RecipeActionType } from './recipe.actions';

export interface FeatureState extends fromApp.AppState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
}

const initialState: RecipeState = {
  recipes: [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    )
  ]
};

export function recipeReducer(
  state = initialState,
  action: RecipeActionsUnion
) {
  switch (action.type) {
    case RecipeActionType.SetRecipes:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActionType.AddRecipe:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActionType.UpdateRecipe:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };
    case RecipeActionType.DeleteRecipe:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}

export const getRecipesState = createFeatureSelector<RecipeState>('recipes');

export const getRecipes = createSelector(
  getRecipesState,
  state => state.recipes
);
