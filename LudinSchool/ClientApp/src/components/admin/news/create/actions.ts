import {
  CreateNewsAction,
  IImageDTO,
  IImage,
  CreateNewsActionTypes,
} from "./types";
import http from "../../../../http_common";

export const loadImage = (body: IImageDTO) => {
  return async (dispatch: React.Dispatch<CreateNewsAction>) => {
    const response = await http.post<IImage>("/api/image/add-image", body);

    const data: IImage = response.data;
    console.log("data: ", data);

    dispatch({
      type: CreateNewsActionTypes.LOAD_IMAGE,
      payload: data,
    });

    return Promise.resolve;
  };
};
