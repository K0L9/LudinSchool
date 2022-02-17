export enum NewsCategoriesActionTypes {
  FETCH_NEWS_CATEGORIES = "FETCH_NEWS_CATEGORIES ",
}
export interface INewsCategory {
  id: number;
  name: string;
}
export interface INewsCategoriesState {
  newsCategories: Array<INewsCategory>;
}

export interface IFetchNewsCategoriesAction {
  type: NewsCategoriesActionTypes.FETCH_NEWS_CATEGORIES;
  payload: Array<INewsCategory>;
}

export type NewsCategoryAction = IFetchNewsCategoriesAction;
