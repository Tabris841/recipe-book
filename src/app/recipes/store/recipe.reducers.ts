import { createFeatureSelector, createSelector } from '@ngrx/store';
import { append, evolve, remove, update } from 'ramda';

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
      return evolve({ recipes: append(action.payload) }, state);
    case RecipeActionType.UpdateRecipe:
      return evolve(
        {
          recipes: update(action.payload.index, action.payload.updatedRecipe)
        },
        state
      );
    case RecipeActionType.DeleteRecipe:
      return evolve(
        {
          recipes: remove(action.payload, 1)
        },
        state
      );
    default:
      return state;
  }
}

export const getRecipesState = createFeatureSelector<RecipeState>('recipes');

export const getRecipes = createSelector(
  getRecipesState,
  state => state.recipes
);
