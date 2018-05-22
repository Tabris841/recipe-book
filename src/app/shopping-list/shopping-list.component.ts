import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { Ingredient } from '../shared/ingredient.model';
import { StartEdit } from './shopping-list.state';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  @Select(state => state.shoppingList)
  shoppingListState$: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store) {}

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
