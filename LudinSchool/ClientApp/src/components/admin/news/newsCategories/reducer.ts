import {
  INewsCategoriesState,
  NewsCategoriesActionTypes,
  NewsCategoryAction,
} from "./types";

const initialState: INewsCategoriesState = {
  newsCategories: [],
};

export const newsCategoriesReducer = (
  state = initialState,
  action: NewsCategoryAction
) => {
  switch (action.type) {
    case NewsCategoriesActionTypes.FETCH_NEWS_CATEGORIES: {
      return {
        ...state,
        newsCategories: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
