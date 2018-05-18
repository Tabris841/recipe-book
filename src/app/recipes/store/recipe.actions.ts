import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';

export enum RecipeActionType {
  SetRecipes = '[Recipe] Set Recipes',
  AddRecipe = '[Recipe] Add Recipe',
  UpdateRecipe = '[Recipe] Update Recipe',
  DeleteRecipe = '[Recipe] Delete Recipe',
  StoreRecipes = '[Recipe] Store Recipes',
  FetchRecipes = '[Recipe] Fetch Recipes',
}

export class SetRecipes implements Action {
  readonly type = RecipeActionType.SetRecipes;

  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = RecipeActionType.AddRecipe;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = RecipeActionType.UpdateRecipe;

  constructor(public payload: { index: number; updatedRecipe: Recipe }) {}
}

export class DeleteRecipe implements Action {
  readonly type = RecipeActionType.DeleteRecipe;

  constructor(public payload: number) {}
}

export class StoreRecipes implements Action {
  readonly type = RecipeActionType.StoreRecipes;
}

export class FetchRecipes implements Action {
  readonly type = RecipeActionType.FetchRecipes;
}

export type RecipeActionsUnion =
  | SetRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes
  | FetchRecipes;
