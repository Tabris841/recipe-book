import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducers';
import { TrySignup } from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private store: Store<fromApp.AppState>) {}

  onSignup(form: NgForm) {
    const username = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new TrySignup({ username, password }));
  }
}
