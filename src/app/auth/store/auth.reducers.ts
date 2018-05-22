import { AuthActionsUnion, AuthActionTypes } from './auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { merge } from 'ramda';

export interface AuthState {
  token: string;
  authenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  authenticated: false
};

export function authReducer(state = initialState, action: AuthActionsUnion) {
  switch (action.type) {
    case AuthActionTypes.SignUp:
    case AuthActionTypes.SignIn:
      return merge(state, { authenticated: true });
    case AuthActionTypes.Logout:
      return merge(state, { token: null, authenticated: true });
    case AuthActionTypes.SetToken:
      return merge(state, { token: action.payload });
    default:
      return state;
  }
}

export const selectAuthState = createFeatureSelector<AuthState>('auth');
export const selectAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.authenticated
);
