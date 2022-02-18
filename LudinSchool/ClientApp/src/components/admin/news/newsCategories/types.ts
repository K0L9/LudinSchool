export enum NewsCategoriesActionTypes {
  FETCH_NEWS_CATEGORIES = "FETCH_NEWS_CATEGORIES",
  SET_NEWS_CATEGORIES_UPDATE = "SET_NEWS_CATEGORIES_UPDATE ",
}
export interface INewsCategory {
  id: number;
  name: string;
}
export interface INewsCategoriesState {
  newsCategories: Array<INewsCategory>;
  isNewsCategoriesUpdate: boolean;
}

export interface IFetchNewsCategoriesAction {
  type: NewsCategoriesActionTypes.FETCH_NEWS_CATEGORIES;
  payload: Array<INewsCategory>;
}
export interface ISetNewsCategoriesUpdateAction {
  type: NewsCategoriesActionTypes.SET_NEWS_CATEGORIES_UPDATE;
  payload: boolean;
}

export type NewsCategoryAction =
  | IFetchNewsCategoriesAction
  | ISetNewsCategoriesUpdateAction;
