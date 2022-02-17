import React from "react";
import { HomeAction, IPaginatedBody, IGetShortNewsResponse } from "./types";
import http from "../../../../http_common";

import * as qs from "qs";

export const fetchNews = (body: IPaginatedBody) => {
  return async (dispatch: React.Dispatch<HomeAction>) => {
    const response = await http.get<IGetShortNewsResponse>(
      "/api/News/get-news?" + qs.stringify(body)
    );

    console.log(response);

    return Promise.resolve;
  };
};
