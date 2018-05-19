import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';

import { TrySignin } from '../auth.state';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  constructor(private store: Store) {}

  onSignin(form: NgForm) {
    const username = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new TrySignin({ username, password }));
  }
}
