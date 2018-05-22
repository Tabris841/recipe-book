import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

import { Recipe } from '../recipe.model';
import * as fromRecipe from '../store/recipe.reducers';
import {
  FetchRecipes,
  RecipeActionType,
  SetRecipes,
  StoreRecipes
} from './recipe.actions';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromRecipe.FeatureState>,
    private db: AngularFireDatabase
  ) {}

  @Effect()
  recipeFetch = this.actions$.pipe(
    ofType<FetchRecipes>(RecipeActionType.FetchRecipes),
    switchMap(
      () => this.db.list<Recipe>('recipes').valueChanges()
      // this.httpClient.get<Recipe[]>(
      //   'https://ng-recipe-book-3adbb.firebaseio.com/recipes.json',
      //   {
      //     observe: 'body',
      //     responseType: 'json'
      //   }
      // )
    ),
    map(recipes => {
      console.log(recipes);
      for (const recipe of recipes) {
        if (!recipe['ingredients']) {
          recipe['ingredients'] = [];
        }
      }
      return new SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  recipeStore = this.actions$.pipe(
    ofType<StoreRecipes>(RecipeActionType.StoreRecipes),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([action, state]) => {
      return this.db.object('recipes').set(state.recipes);
      // const req = new HttpRequest(
      //   'PUT',
      //   'https://ng-recipe-book-3adbb.firebaseio.com/recipes.json',
      //   state.recipes,
      //   { reportProgress: true }
      // );
      // return this.httpClient.request(req);
    })
  );
}
