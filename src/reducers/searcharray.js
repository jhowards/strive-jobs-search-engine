import { initialState } from "../store";

const searcharrayReducer = (state = initialState.search, action) => {
  switch (action.type) {
    case "FILL_ARRAY":
      return {
        ...state,
        searchresults: action.payload,
      };

    case "FILL_ARRAY_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "FILL_ARRAY_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "BACK_BUTTON_PRESSED":
      return {
        ...state,
        backbutton: action.payload,
      };

    default:
      return state;
  }
};

export default searcharrayReducer;
