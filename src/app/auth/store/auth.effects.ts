import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

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
  constructor(
    private actions$: Actions,
    private router: Router,
    public afAuth: AngularFireAuth
  ) {}

  @Effect()
  authSignup = this.actions$.pipe(
    ofType<TrySignup>(AuthActionTypes.TrySignUp),
    map(action => action.payload),
    switchMap((authData: { username: string; password: string }) =>
      from(
        this.afAuth.auth.createUserWithEmailAndPassword(
          authData.username,
          authData.password
        )
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
        this.afAuth.auth.signInWithEmailAndPassword(
          authData.username,
          authData.password
        )
      )
    ),
    switchMap(() => this.afAuth.auth.currentUser.getIdToken(false)),
    tap(() => this.router.navigate(['/'])),
    mergeMap((token: string) => [new Signin(), new SetToken(token)])
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() =>
      this.afAuth.auth.signOut().then(() => this.router.navigate(['/']))
    )
  );
}
