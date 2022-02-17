import { IImage, IImageDTO, INews, IImagesNewsDTO } from "./types";
import http from "../../../../http_common";
import axios, { AxiosError } from "axios";

export class CreateNewsService {
  loadImage: (body: IImageDTO) => Promise<IImage>;
  deleteImage: (body: IImage) => Promise<void>;
  loadNews: (body: INews) => Promise<number>;
  connectImagesNews: (body: IImagesNewsDTO) => Promise<void>;

  constructor() {
    // super();
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
  }
}
