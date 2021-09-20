import { initialState } from "../store";

const favouritesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMPANY_TO_FAV":
      return {
        ...state,
        company: [...state.company, action.payload],
      };
    case "REMOVE_COMPANY_FROM_FAVOURITES":
      return {
        ...state,
        company: state.company.filter((company, i) => i !== action.payload),
      };
    default:
      return state;
  }
};

export default favouritesReducer;
