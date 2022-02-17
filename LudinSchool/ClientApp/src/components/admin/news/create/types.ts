export enum CreateNewsActionTypes {
  LOAD_IMAGE = "LOAD_IMAGE",
  HANDLE_IMAGE_DOWN = "HANDLE_IMAGE_DOWN",
  HANDLE_IMAGE_UP = "HANDLE_IMAGE_UP",
}
export interface IAddNewsState {
  images: Array<IImage>;
}
export interface INews {
  content: string;
  smallContent: string;
  title: string;
  newsCategoryId: number;
}

export interface IImageDTO {
  base64: string;
}
export interface IImage {
  fileName: string;
}

export interface ISendImageAction {
  type: CreateNewsActionTypes.LOAD_IMAGE;
  payload: IImage;
}
export interface IImageDown {
  type: CreateNewsActionTypes.HANDLE_IMAGE_DOWN;
  payload: number;
}
export interface IImageUp {
  type: CreateNewsActionTypes.HANDLE_IMAGE_UP;
  payload: number;
}

export type CreateNewsAction = ISendImageAction | IImageUp | IImageDown;
