import {
  INewsCategory,
  NewsCategoriesActionTypes,
  NewsCategoryAction,
} from "./types";
import http from "../../../../http_common";

export const fetchNewsCategories = () => {
  return async (dispatch: React.Dispatch<NewsCategoryAction>) => {
    const response = await http.get<Array<INewsCategory>>(
      "api/newsCategory/get-all-news-categories"
    );

    const data: Array<INewsCategory> = response.data;

    dispatch({
      type: NewsCategoriesActionTypes.FETCH_NEWS_CATEGORIES,
      payload: data,
    });
  };
};
