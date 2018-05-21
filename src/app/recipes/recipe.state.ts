import { HttpClient } from '@angular/common/http';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';

export class SetRecipes {
  static readonly type = '[Recipe] Set Recipes';

  constructor(public payload: Recipe[]) {}
}

export class AddRecipe {
  static readonly type = '[Recipe] Add Recipe';

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe {
  static readonly type = '[[Recipe] Update Recipe';

  constructor(public payload: { index: number; updatedRecipe: Recipe }) {}
}

export class DeleteRecipe {
  static readonly type = '[Recipe] Delete Recipe';

  constructor(public payload: number) {}
}

export class StoreRecipes {
  static readonly type = '[Recipe] Store Recipes';
}

export class FetchRecipes {
  static readonly type = '[Recipe] Fetch Recipes';
}

export interface RecipeStateModel {
  recipes: Recipe[];
}

@State<RecipeStateModel>({
  name: 'recipes',
  defaults: {
    recipes: [
      new Recipe(
        'Tasty Schnitzel',
        'A super-tasty Schnitzel - just awesome!',
        'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
        [new Ingredient('Meat', 1), new Ingredient('French Fries', 20)]
      ),
      new Recipe(
        'Big Fat Burger',
        'What else you need to say?',
        'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
        [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
      )
    ]
  }
})
export class RecipeState {
  constructor(
    private httpClient: HttpClient,
    private db: AngularFireDatabase
  ) {}

  @Selector()
  static recipes(state: RecipeStateModel) {
    return state.recipes;
  }

  @Action(SetRecipes)
  setRecipes(
    { getState, setState }: StateContext<RecipeStateModel>,
    { payload }: SetRecipes
  ) {
    setState({
      ...getState(),
      recipes: [...payload]
    });
  }

  @Action(AddRecipe)
  addRecipe(
    { getState, setState }: StateContext<RecipeStateModel>,
    { payload }: AddRecipe
  ) {
    const state = getState();
    setState({
      ...state,
      recipes: [...state.recipes, payload]
    });
  }

  @Action(UpdateRecipe)
  updateRecipe(
    { getState, setState }: StateContext<RecipeStateModel>,
    { payload }: UpdateRecipe
  ) {
    const state = getState();
    const recipe = state.recipes[payload.index];
    const updatedRecipe = {
      ...recipe,
      ...payload.updatedRecipe
    };
    const recipes = [...state.recipes];
    recipes[payload.index] = updatedRecipe;
    setState({
      ...state,
      recipes: recipes
    });
  }

  @Action(DeleteRecipe)
  deleteRecipe(
    { getState, setState }: StateContext<RecipeStateModel>,
    { payload }: DeleteRecipe
  ) {
    const state = getState();
    const oldRecipes = [...state.recipes];
    oldRecipes.splice(payload, 1);
    setState({
      ...state,
      recipes: oldRecipes
    });
  }

  @Action(FetchRecipes)
  fetchRecipes({ dispatch, getState }: StateContext<RecipeStateModel>) {
    // return this.httpClient
    //   .get<Recipe[]>('https://recipe-book-7ea07.firebaseio.com/recipes.json', {
    //     observe: 'body',
    //     responseType: 'json'
    //   })
    //   .pipe(
    //     map(recipes => {
    //       console.log(recipes);
    //       for (const recipe of recipes) {
    //         if (!recipe['ingredients']) {
    //           recipe['ingredients'] = [];
    //         }
    //       }
    //       return dispatch(new SetRecipes(recipes));
    //     })
    //   );
    return this.db
      .list<Recipe>(`recipes`)
      .valueChanges()
      .pipe(
        map(recipes => {
          console.log(recipes);
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return dispatch(new SetRecipes(recipes));
        })
      );
  }

  @Action(StoreRecipes)
  storeRecipes({ getState }: StateContext<RecipeStateModel>) {
    const state = getState();
    return this.db.object('recipes').set(state.recipes);
    // const req = new HttpRequest(
    //   'PUT',
    //   'https://recipe-book-7ea07.firebaseio.com/recipes.json',
    //   state.recipes,
    //   { reportProgress: true }
    // );
    // return this.httpClient.request(req);
  }
}
