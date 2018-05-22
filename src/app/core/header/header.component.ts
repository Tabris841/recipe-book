import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { FetchRecipes, StoreRecipes } from '../../recipes/store';
import { AuthState, Logout } from '../../auth/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Select(AuthState.authenticated)
  authenticated$: Observable<boolean>;

  constructor(private store: Store) {}

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
