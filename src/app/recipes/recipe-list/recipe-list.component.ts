import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import * as fromRecipe from '../store/recipe.reducers';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {
  recipes$: Observable<Recipe[]>;

  constructor(
    private store: Store<fromRecipe.FeatureState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recipes$ = store.pipe(select(fromRecipe.getRecipes));
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
