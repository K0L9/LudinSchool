export enum CreateNewsActionTypes {
  LOAD_IMAGE = "LOAD_IMAGE",
}
export interface IAddNewsState {
  images: Array<IImage>;
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

export type CreateNewsAction = ISendImageAction;
