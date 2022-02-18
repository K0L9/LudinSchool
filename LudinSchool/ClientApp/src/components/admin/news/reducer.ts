import {
  IAdminNewsReducerState,
  AdminNewsAction,
  AdminNewsActionTypes,
} from "./types";

const initialState: IAdminNewsReducerState = {
  news: null,
  isUpdate: false,
};

export const newsAdminReducer = (
  state = initialState,
  action: AdminNewsAction
) => {
  switch (action.type) {
    case AdminNewsActionTypes.FETCH_NEWS: {
      return {
        ...state,
        news: action.payload,
      };
    }
    case AdminNewsActionTypes.SET_NEWS_UPDATE: {
      return {
        ...state,
        isUpdate: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
