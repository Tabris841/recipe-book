import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListState, StartEdit } from './store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  @Select(ShoppingListState.ingredients)
  ingredients$: Observable<Ingredient[]>;

  constructor(private store: Store) {}

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
