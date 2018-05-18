import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import * as fromApp from '../store/app.reducers';
import { Store } from '@ngrx/store';
import { StartEdit } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  ngOnDestroy() {
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
