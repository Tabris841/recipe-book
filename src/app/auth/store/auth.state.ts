import { Router } from '@angular/router';
import { State, Action, StateContext } from '@ngxs/store';
import { from } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

import {
  Logout,
  SetToken,
  Signin,
  Signup,
  TrySignin,
  TrySignup
} from './auth.actions';

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
  constructor(private router: Router, public afAuth: AngularFireAuth) {}

  @Action(Signup)
  signup({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      authenticated: true
    });
  }

  @Action(Signin)
  signip({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      authenticated: true
    });
  }

  @Action(Logout)
  logout({ patchState }: StateContext<AuthStateModel>) {
    patchState({
      token: null,
      authenticated: false
    });
  }

  @Action(SetToken)
  setState(
    { patchState }: StateContext<AuthStateModel>,
    { payload }: SetToken
  ) {
    patchState({
      token: payload
    });
  }

  @Action(TrySignup)
  authSignup(
    { dispatch }: StateContext<AuthStateModel>,
    { payload: { username, password } }: TrySignup
  ) {
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(username, password)
    ).pipe(
      mergeMap((token: string) => dispatch([new Signup(), new SetToken(token)]))
    );
  }

  @Action(TrySignin)
  authSignin(
    { dispatch }: StateContext<AuthStateModel>,
    { payload: { username, password } }: TrySignin
  ) {
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(username, password)
    ).pipe(
      switchMap(() => this.afAuth.auth.currentUser.getIdToken(false)),
      tap(() => this.router.navigate(['/'])),
      mergeMap(token => dispatch([new Signin(), new SetToken(token)]))
    );
  }

  @Action(Logout)
  authLogout({ getState, setState }: StateContext<AuthStateModel>) {
    this.afAuth.auth.signOut().then(() => this.router.navigate(['/']));
    setState({
      ...getState(),
      token: null,
      authenticated: false
    });
  }
}
