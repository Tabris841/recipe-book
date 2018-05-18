import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

import {
  AuthActionTypes,
  Logout,
  SetToken,
  Signin,
  Signup,
  TrySignin,
  TrySignup
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router) {}

  @Effect()
  authSignup = this.actions$.pipe(
    ofType<TrySignup>(AuthActionTypes.TrySignUp),
    map(action => action.payload),
    switchMap((authData: { username: string; password: string }) =>
      from(
        firebase
          .auth()
          .createUserWithEmailAndPassword(authData.username, authData.password)
      )
    ),
    mergeMap((token: string) => [new Signup(), new SetToken(token)])
  );

  @Effect()
  authSignin = this.actions$.pipe(
    ofType<TrySignin>(AuthActionTypes.TrySignIn),
    map(action => action.payload),
    switchMap((authData: { username: string; password: string }) =>
      from(
        firebase
          .auth()
          .signInWithEmailAndPassword(authData.username, authData.password)
      )
    ),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [new Signin(), new SetToken(token)];
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => this.router.navigate(['/']))
  );
}
