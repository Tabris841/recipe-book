import { Ingredient } from '../../shared/ingredient.model';

export class AddIngredient {
  static readonly type = '[ShoppingList] Add Ingredient';

  constructor(public payload: Ingredient) {}
}

export class AddIngredients {
  static readonly type = '[ShoppingList] Add Ingredients';

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient {
  static readonly type = '[ShoppingList] Update Ingredient';

  constructor(public payload: { ingredient: Ingredient }) {}
}

export class DeleteIngredient {
  static readonly type = '[ShoppingList] Delete Ingredient';
}

export class StartEdit {
  static readonly type = '[ShoppingList] StartEdit';

  constructor(public payload: number) {}
}

export class StopEdit {
  static readonly type = '[ShoppingList] StopEdit';
}
