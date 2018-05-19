import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';

import { Ingredient } from '../shared/ingredient.model';
import { StartEdit } from './shopping-list.state';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  shoppingListState$: Observable<{ ingredients: Ingredient[] }>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.shoppingListState$ = this.store.select(state => state.shoppingList);
  }

  onEditItem(index: number) {
    this.store.dispatch(new StartEdit(index));
  }
}
