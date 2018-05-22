import { Recipe } from '../recipe.model';

export class SetRecipes {
  static readonly type = '[Recipe] Set Recipes';

  constructor(public payload: Recipe[]) {}
}

export class AddRecipe {
  static readonly type = '[Recipe] Add Recipe';

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe {
  static readonly type = '[Recipe] Update Recipe';

  constructor(public payload: { index: number; updatedRecipe: Recipe }) {}
}

export class DeleteRecipe {
  static readonly type = '[Recipe] Delete Recipe';

  constructor(public payload: number) {}
}

export class StoreRecipes {
  static readonly type = '[Recipe] Store Recipes';
}

export class FetchRecipes {
  static readonly type = '[Recipe] Fetch Recipes';
}
