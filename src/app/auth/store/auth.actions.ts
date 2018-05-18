import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  TrySignUp = '[Auth] Try SignUp',
  SignUp = '[Auth] SignUp',
  TrySignIn = '[Auth] Try SignIn',
  SignIn = '[Auth] SignIn',
  Logout = '[Auth] Logout',
  SetToken = '[Auth] Set Token'
}

export class TrySignup implements Action {
  readonly type = AuthActionTypes.TrySignUp;

  constructor(public payload: { username: string; password: string }) {}
}

export class TrySignin implements Action {
  readonly type = AuthActionTypes.TrySignIn;

  constructor(public payload: { username: string; password: string }) {}
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SignUp;
}

export class Signin implements Action {
  readonly type = AuthActionTypes.SignIn;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class SetToken implements Action {
  readonly type = AuthActionTypes.SetToken;

  constructor(public payload: string) {}
}

export type AuthActionsUnion =
  | Signup
  | Signin
  | Logout
  | SetToken
  | TrySignup
  | TrySignin;
