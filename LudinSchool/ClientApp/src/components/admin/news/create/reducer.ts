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
    case CreateNewsActionTypes.HANDLE_IMAGE_DOWN: {
      let tmpImages = state.images.slice();
      const imageId = action.payload;
      if (imageId == tmpImages.length - 1) return state;
      let tmp = tmpImages[imageId].fileName;
      tmpImages[imageId].fileName = tmpImages[imageId + 1].fileName;
      tmpImages[imageId + 1].fileName = tmp;

      return {
        ...state,
        images: tmpImages,
      };
    }
    case CreateNewsActionTypes.HANDLE_IMAGE_UP: {
      let tmpImages = state.images.slice();
      const imageId = action.payload;
      if (imageId == 0) return state;
      let tmp = tmpImages[imageId].fileName;
      tmpImages[imageId].fileName = tmpImages[imageId - 1].fileName;
      tmpImages[imageId - 1].fileName = tmp;

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
