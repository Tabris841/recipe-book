import { AuthState, AuthStateModel } from './auth/auth.state';
import {
  ShoppingListState,
  ShoppingListStateModel
} from './shopping-list/shopping-list.state';

export interface AppState {
  auth: AuthStateModel;
  shoppingList: ShoppingListStateModel;
}

export const states = [AuthState, ShoppingListState];
