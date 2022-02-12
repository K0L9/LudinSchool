export enum HomeActionTypes {
  FETCH_NEWS = "FETCH_NEWS",
}

export interface IShortNews {
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
  news: Array<IShortNews>;
}
export interface IPaginatedBody {
  pageSize: number;
  pageCount: number;
}

export interface IGetShortNewsAction {
  type: HomeActionTypes.FETCH_NEWS;
  payload: IPaginatedBody;
}

export type HomeAction = IGetShortNewsAction;
