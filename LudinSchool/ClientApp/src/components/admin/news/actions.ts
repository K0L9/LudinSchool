import { IPaginatedBody, AdminNewsAction, AdminNewsActionTypes } from "./types";
import { AdminNewsService } from "./service";

const service: AdminNewsService = new AdminNewsService();

export const fetchNews = (body: IPaginatedBody) => {
  return async (dispatch: React.Dispatch<AdminNewsAction>) => {
    try {
      service
        .fetchNews(body)
        .then((response) => {
          dispatch({
            type: AdminNewsActionTypes.FETCH_NEWS,
            payload: response,
          });
        })
        .catch((ex) => {
          return Promise.reject(ex);
        });
      return Promise.resolve;
    } catch (error) {}
  };
};

export const setNewsUpdate = (body: boolean) => {
  return async (dispatch: React.Dispatch<AdminNewsAction>) => {
    try {
      dispatch({
        type: AdminNewsActionTypes.SET_NEWS_UPDATE,
        payload: body,
      });

      return Promise.resolve;
    } catch (error) {}
  };
};
