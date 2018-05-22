import { State, Action, StateContext } from '@ngxs/store';

import { Ingredient } from '../shared/ingredient.model';

export class AddIngredient {
  static readonly type = '[ShoppingEdit Component] ShoppingList Add Ingredient';

  constructor(public payload: Ingredient) {}
}

export class AddIngredients {
  static readonly type = '[RecipeDetail Component] ShoppingList Add Ingredients';

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient {
  static readonly type = '[ShoppingEdit Component] ShoppingList Update Ingredient';

  constructor(public payload: { ingredient: Ingredient }) {}
}

export class DeleteIngredient {
  static readonly type = '[ShoppingLEdit Component] ShoppingList Delete Ingredient';
}

export class StartEdit {
  static readonly type = '[ShoppingList Component] ShoppingList StartEdit';

  constructor(public payload: number) {}
}

export class StopEdit {
  static readonly type = '[ShoppingEdit Component] ShoppingList StopEdit';
}

export interface ShoppingListStateModel {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

@State<ShoppingListStateModel>({
  name: 'shoppingList',
  defaults: {
    ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
    editedIngredient: null,
    editedIngredientIndex: -1
  }
})
export class ShoppingListState {
  @Action(AddIngredient)
  addIngredient(
    { getState, setState }: StateContext<ShoppingListStateModel>,
    { payload }: AddIngredient
  ) {
    const state = getState();
    setState({
      ...state,
      ingredients: [...state.ingredients, payload]
    });
  }

  @Action(AddIngredients)
  addIngredients(
    { getState, setState }: StateContext<ShoppingListStateModel>,
    { payload }: AddIngredients
  ) {
    const state = getState();
    setState({
      ...state,
      ingredients: [...state.ingredients, ...payload]
    });
  }

  @Action(UpdateIngredient)
  updateIngredient(
    { getState, setState }: StateContext<ShoppingListStateModel>,
    { payload }: UpdateIngredient
  ) {
    const state = getState();
    const ingredient = state.ingredients[state.editedIngredientIndex];
    const updatedIngredient = {
      ...ingredient,
      ...payload.ingredient
    };
    const ingredients = [...state.ingredients];
    ingredients[state.editedIngredientIndex] = updatedIngredient;
    setState({
      ...state,
      ingredients: ingredients,
      editedIngredient: null,
      editedIngredientIndex: -1
    });
  }

  @Action(DeleteIngredient)
  deleteIngredient({
    getState,
    setState
  }: StateContext<ShoppingListStateModel>) {
    const state = getState();
    const oldIngredients = [...state.ingredients];
    oldIngredients.splice(state.editedIngredientIndex, 1);
    setState({
      ...state,
      ingredients: oldIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1
    });
  }

  @Action(StartEdit)
  startEdit(
    { getState, setState }: StateContext<ShoppingListStateModel>,
    { payload }: StartEdit
  ) {
    const state = getState();
    const editedIngredient = { ...state.ingredients[payload] };
    setState({
      ...state,
      editedIngredient: editedIngredient,
      editedIngredientIndex: payload
    });
  }

  @Action(StopEdit)
  stopEdit({ getState, setState }: StateContext<ShoppingListStateModel>) {
    const state = getState();
    setState({
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1
    });
  }
}
