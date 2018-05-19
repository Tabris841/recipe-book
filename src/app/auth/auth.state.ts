import { Router } from '@angular/router';
import { State, Action, StateContext } from '@ngxs/store';
import { from } from 'rxjs';
import * as firebase from 'firebase';
import { mergeMap, switchMap, tap } from 'rxjs/operators';

export class TrySignup {
  static readonly type = '[Auth] Try SignUp';

  constructor(public payload: { username: string; password: string }) {}
}

export class TrySignin {
  static readonly type = '[Auth] Try SignIn';

  constructor(public payload: { username: string; password: string }) {}
}

export class Signup {
  static readonly type = '[Auth] SignUp';
}

export class Signin {
  static readonly type = '[Auth] SignIn';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class SetToken {
  static readonly type = '[Auth] Set Token';

  constructor(public payload: string) {}
}

export interface AuthStateModel {
  token: string;
  authenticated: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    authenticated: false
  }
})
export class AuthState {
  constructor(private router: Router) {}

  @Action(Signup)
  signup({ getState, setState }: StateContext<AuthStateModel>) {
    setState({
      ...getState(),
      authenticated: true
    });
  }

  @Action(Signin)
  signip({ getState, setState }: StateContext<AuthStateModel>) {
    setState({
      ...getState(),
      authenticated: true
    });
  }

  @Action(Logout)
  logout({ getState, setState }: StateContext<AuthStateModel>) {
    setState({
      ...getState(),
      token: null,
      authenticated: false
    });
  }

  @Action(SetToken)
  setState(
    { getState, setState }: StateContext<AuthStateModel>,
    { payload }: SetToken
  ) {
    setState({
      ...getState(),
      token: payload
    });
  }

  @Action(TrySignup)
  authSignup(
    { dispatch }: StateContext<AuthStateModel>,
    { payload }: TrySignup
  ) {
    return from(
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.username, payload.password)
    ).pipe(
      mergeMap((token: string) => dispatch([new Signup(), new SetToken(token)]))
    );
  }

  @Action(TrySignin)
  authSignin(
    { dispatch }: StateContext<AuthStateModel>,
    { payload }: TrySignin
  ) {
    return from(
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.username, payload.password)
    ).pipe(
      switchMap(() => from(firebase.auth().currentUser.getIdToken())),
      tap(() => this.router.navigate(['/'])),
      mergeMap((token: string) => dispatch([new Signin(), new SetToken(token)]))
    );
  }

  @Action(Logout)
  authLogout(
    { getState, setState }: StateContext<AuthStateModel>,
  ) {
    this.router.navigate(['/']);
    setState({
      ...getState(),
      token: null,
      authenticated: false
    });
  }
}
