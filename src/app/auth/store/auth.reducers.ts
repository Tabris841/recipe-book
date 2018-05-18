import { AuthActionsUnion, AuthActionTypes } from './auth.actions';


export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
};

export function authReducer(
  state = initialState,
  action: AuthActionsUnion
) {
  switch (action.type) {
    case AuthActionTypes.SignUp:
    case AuthActionTypes.SignIn:
      return {
        ...state,
        authenticated: true
      };
    case AuthActionTypes.Logout:
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case AuthActionTypes.SetToken:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
