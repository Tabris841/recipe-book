import { State, Action, StateContext, Selector } from '@ngxs/store';

import { Ingredient } from '../../shared/ingredient.model';
import {
  AddIngredient,
  AddIngredients,
  DeleteIngredient,
  StartEdit,
  StopEdit,
  UpdateIngredient
} from './shopping-list.actions';

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
  @Selector()
  static ingredients(state: ShoppingListStateModel) {
    return state.ingredients;
  }

  @Selector()
  static shoppingList(state: ShoppingListStateModel) {
    return state.ingredients;
  }

  @Action(AddIngredient)
  addIngredient(
    { getState, patchState }: StateContext<ShoppingListStateModel>,
    { payload }: AddIngredient
  ) {
    const state = getState();
    patchState({
      ingredients: [...state.ingredients, payload]
    });
  }

  @Action(AddIngredients)
  addIngredients(
    { getState, patchState }: StateContext<ShoppingListStateModel>,
    { payload }: AddIngredients
  ) {
    const state = getState();
    patchState({
      ingredients: [...state.ingredients, ...payload]
    });
  }

  @Action(UpdateIngredient)
  updateIngredient(
    { getState, patchState }: StateContext<ShoppingListStateModel>,
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
    patchState({
      ...state,
      ingredients: ingredients,
      editedIngredient: null,
      editedIngredientIndex: -1
    });
  }

  @Action(DeleteIngredient)
  deleteIngredient({
    getState,
    patchState
  }: StateContext<ShoppingListStateModel>) {
    const state = getState();
    const newIngredients = state.ingredients.slice();
    newIngredients.splice(state.editedIngredientIndex, 1);
    patchState({
      ingredients: newIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1
    });
  }

  @Action(StartEdit)
  startEdit(
    { getState, patchState }: StateContext<ShoppingListStateModel>,
    { payload }: StartEdit
  ) {
    const state = getState();
    const editedIngredient = { ...state.ingredients[payload] };
    patchState({
      editedIngredient: editedIngredient,
      editedIngredientIndex: payload
    });
  }

  @Action(StopEdit)
  stopEdit({ patchState }: StateContext<ShoppingListStateModel>) {
    patchState({
      editedIngredient: null,
      editedIngredientIndex: -1
    });
  }
}
