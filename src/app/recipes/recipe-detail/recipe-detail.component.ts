import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import * as fromRecipe from '../store/recipe.reducers';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import { DeleteRecipe } from '../store/recipe.actions';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipes$: Observable<Recipe[]>;
  id: number;

  constructor(
    private store: Store<fromRecipe.FeatureState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.recipes$ = store.select(fromRecipe.getRecipes);
    store.select(fromRecipe.getRecipes).subscribe((v) => console.log(v))
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
  }

  onAddToShoppingList() {
    this.store
      .pipe(select(fromRecipe.getRecipes), take(1))
      .subscribe(recipes => {
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
