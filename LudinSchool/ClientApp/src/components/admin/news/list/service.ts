import { IGetShortNewsResponse, IPaginatedBody, IShortNews } from "./types";
import http from "../../../../http_common";

import * as qs from "qs";
import axios, { AxiosError } from "axios";

export class NewsService {
  fetchNews: (body: IPaginatedBody) => Promise<IGetShortNewsResponse>;
  fetchAllNews: () => Promise<IGetShortNewsResponse>;

  constructor() {
    this.fetchAllNews = async () => {
      const response = await http
        .get<IGetShortNewsResponse>("/api/News/get-all-news")
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) throw (error as AxiosError).message;
          throw error;
        });

      return response;
    };
    this.fetchNews = async (body) => {
      const response = await http
        .get<IGetShortNewsResponse>("/api/News/get-news?" + qs.stringify(body))
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) throw (error as AxiosError).message;
          throw error;
        });

      return response;
    };
  }
}
