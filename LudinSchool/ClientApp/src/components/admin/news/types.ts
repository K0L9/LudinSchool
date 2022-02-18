export enum AdminNewsActionTypes {
  FETCH_NEWS = "FETCH_NEWS",
  SET_NEWS_UPDATE = "SET_NEWS_UPDATE",
}

export interface IAdminNewsReducerState {
  news: IGetShortNewsResponse | null;
  isUpdate: boolean;
}

export interface INewsDTO {
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
export interface IImagesNewsDTO {
  newsId: number;
  fileNames: Array<string>;
}

export interface IShortNewsVM {
  slug: string;
  title: string;
  smallContent: string;
  imagePath: string;
  categoryName: string;
  date: Date;
}
export interface IGetShortNewsResponse {
  isLast: boolean;
  totalPages: number;
  currentPage: number;
  news: Array<IShortNewsVM>;
}
export interface IPaginatedBody {
  pageSize: number;
  pageCount: number;
}

//actions
export interface ISetNewsAction {
  type: AdminNewsActionTypes.FETCH_NEWS;
  payload: IGetShortNewsResponse;
}
export interface ISetNewsUpdate {
  type: AdminNewsActionTypes.SET_NEWS_UPDATE;
  payload: boolean;
}

export type AdminNewsAction = ISetNewsAction | ISetNewsUpdate;
