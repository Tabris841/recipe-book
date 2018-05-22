import { State, Action, StateContext, Selector } from '@ngxs/store';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import {
  AddRecipe,
  DeleteRecipe,
  FetchRecipes,
  SetRecipes,
  StoreRecipes,
  UpdateRecipe
} from './recipe.actions';

export interface RecipeStateModel {
  recipes: Recipe[];
  recipeForm: {
    model;
    dirty: boolean;
    status: string;
    errors;
  };
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
    ],
    recipeForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
export class RecipeState {
  constructor(private db: AngularFireDatabase) {}

  @Selector()
  static recipes(state: RecipeStateModel) {
    return state.recipes;
  }

  @Action(SetRecipes)
  setRecipes(
    { patchState }: StateContext<RecipeStateModel>,
    { payload }: SetRecipes
  ) {
    patchState({ recipes: [...payload] });
  }

  @Action(AddRecipe)
  addRecipe(
    { getState, patchState }: StateContext<RecipeStateModel>,
    { payload }: AddRecipe
  ) {
    const state = getState();
    patchState({
      recipes: [...state.recipes, payload]
    });
  }

  @Action(UpdateRecipe)
  updateRecipe(
    { getState, setState, patchState }: StateContext<RecipeStateModel>,
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
    patchState({
      recipes: recipes
    });
  }

  @Action(DeleteRecipe)
  deleteRecipe(
    { getState, patchState }: StateContext<RecipeStateModel>,
    { payload }: DeleteRecipe
  ) {
    const newRecipes = getState().recipes.slice();
    newRecipes.splice(payload, 1);
    patchState({
      recipes: newRecipes
    });
  }

  @Action(FetchRecipes)
  fetchRecipes({ dispatch }: StateContext<RecipeStateModel>) {
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
  }
}
