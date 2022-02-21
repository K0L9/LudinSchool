import {
  IImage,
  IImageDTO,
  IImagesNewsDTO,
  INewsDTO,
  IPaginatedBody,
  IGetShortNewsResponse,
} from "./types";
import http from "../../../http_common";
import axios, { AxiosError } from "axios";
import * as qs from "qs";

export class AdminNewsService {
  loadImage: (body: IImageDTO) => Promise<IImage>;
  deleteImage: (body: IImage) => Promise<void>;
  loadNews: (body: INewsDTO) => Promise<number>;
  connectImagesNews: (body: IImagesNewsDTO) => Promise<void>;
  fetchNews: (body: IPaginatedBody) => Promise<IGetShortNewsResponse>;
  fetchAllNews: () => Promise<IGetShortNewsResponse>;
  deleteNews: (slug: string) => void;

  constructor() {
    this.loadImage = async (body) => {
      const response = await http
        .post<IImage>("/api/image/add-image", body)
        .then((response) => {
          const data: IImage = response.data;
          return data;
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) throw (error as AxiosError).message;
          throw error;
        });

      return response;
    };
    this.deleteImage = async (body) => {
      try {
        const response = await http
          .post("/api/image/delete-image", body)
          .then()
          .catch((error) => {
            if (axios.isAxiosError(error)) throw (error as AxiosError).message;
            throw error;
          });
      } catch (error) {
        throw error;
      }
    };
    this.loadNews = async (body) => {
      try {
        const response = await http
          .post("/api/news/add-news", body)
          .then((response) => {
            const id: number = response.data;
            return id;
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              throw (error as AxiosError).message;
            }
            throw error;
          });
        return response;
      } catch (error) {
        throw error;
      }
    };
    this.connectImagesNews = async (body) => {
      const response = await http
        .post("/api/image/connect-images-news", body)
        .then()
        .catch((error) => {
          if (axios.isAxiosError(error)) throw (error as AxiosError).message;
          throw error;
        });
    };
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
    this.deleteNews = async (slug) => {
      const response = await http
        .delete(`/api/News/delete-news/${slug}`)
        .catch((error) => {
          if (axios.isAxiosError(error)) throw (error as AxiosError).message;
          throw error;
        });
    };
  }
}
