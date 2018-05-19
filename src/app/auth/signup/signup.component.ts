import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';

import { TrySignup } from '../auth.state';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private store: Store) {}

  onSignup(form: NgForm) {
    const username = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new TrySignup({ username, password }));
  }
}
