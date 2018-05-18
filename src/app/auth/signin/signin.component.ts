import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import { TrySignin } from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(private store: Store<fromApp.AppState>) {}

  onSignin(form: NgForm) {
    const username = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new TrySignin({ username, password }));
  }
}
