import {
  IAddNewsState,
  CreateNewsAction,
  CreateNewsActionTypes,
} from "./types";

const initialState: IAddNewsState = {
  images: [],
};

export const createNewsReducer = (
  state = initialState,
  action: CreateNewsAction
) => {
  switch (action.type) {
    case CreateNewsActionTypes.LOAD_IMAGE: {
      let tmpImages = state.images.slice();
      tmpImages.push(action.payload);
      return {
        ...state,
        images: tmpImages,
      };
    }
    default: {
      return state;
    }
  }
};
