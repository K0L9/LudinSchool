import {
  INewsCategoriesState,
  NewsCategoriesActionTypes,
  NewsCategoryAction,
} from "./types";

const initialState: INewsCategoriesState = {
  newsCategories: [],
  isNewsCategoriesUpdate: false,
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
    case NewsCategoriesActionTypes.SET_NEWS_CATEGORIES_UPDATE: {
      return {
        ...state,
        isNewsCategoriesUpdate: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
