import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListActionsTypes, ShoppingListActionsUnion } from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActionsUnion
) {
  switch (action.type) {
    case ShoppingListActionsTypes.AddIngredient:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActionsTypes.AddIngredients:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActionsTypes.UpdateIngredient:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const ingredients = [...state.ingredients];
      ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActionsTypes.DeleteIngredient:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActionsTypes.StartEdit:
      const editedIngredient = { ...state.ingredients[action.payload] };
      return {
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      };
    case ShoppingListActionsTypes.StopEdit:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
