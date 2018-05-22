import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Recipe } from '../recipe.model';
import { DeleteRecipe, RecipeState } from '../store';
import { AddIngredients } from '../../shopping-list/store';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Select(RecipeState.recipes) recipes$: Observable<Recipe[]>;
  id: number;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    store.select(state => state.recipes).subscribe(v => console.log(v));
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
  }

  onAddToShoppingList() {
    this.store.selectOnce(state => state.recipes).subscribe(({ recipes }) => {
      this.store.dispatch(new AddIngredients(recipes[this.id].ingredients));
    });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
