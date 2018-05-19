import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchRecipes, StoreRecipes } from '../../recipes/recipe.state';
import { AuthStateModel, Logout } from '../../auth/auth.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authState$: Observable<AuthStateModel>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.authState$ = this.store.select(state => state.auth);
  }

  onSaveData() {
    this.store.dispatch(new StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }
}
