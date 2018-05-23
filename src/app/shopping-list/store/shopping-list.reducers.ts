import { always, append, concat, evolve, remove, update } from 'ramda';

import { Ingredient } from '../../shared/ingredient.model';
import {
  ShoppingListActionsTypes,
  ShoppingListActionsUnion
} from './shopping-list.actions';

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
      return evolve({ ingredients: append(action.payload) }, state);
    case ShoppingListActionsTypes.AddIngredients:
      return evolve({ ingredients: concat(action.payload) }, state);
    case ShoppingListActionsTypes.UpdateIngredient:
      return evolve(
        {
          ingredients: update(
            state.editedIngredientIndex,
            action.payload.ingredient
          ),
          editedIngredient: always(null),
          editedIngredientIndex: always(-1)
        },
        state
      );
    case ShoppingListActionsTypes.DeleteIngredient:
      return evolve(
        {
          ingredients: remove(state.editedIngredientIndex, 1),
          editedIngredient: always(null),
          editedIngredientIndex: always(-1)
        },
        state
      );
    case ShoppingListActionsTypes.StartEdit:
      return evolve(
        {
          editedIngredient: always({ ...state.ingredients[action.payload] }),
          editedIngredientIndex: always(action.payload)
        },
        state
      );
    case ShoppingListActionsTypes.StopEdit:
      return evolve(
        {
          editedIngredient: always(null),
          editedIngredientIndex: always(-1)
        },
        state
      );
    default:
      return state;
  }
}
