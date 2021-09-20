import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import favouritesReducer from "../reducers/favourites";
import searcharrayReducer from "../reducers/searcharray";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export const initialState = {
  companies: {
    company: [],
  },
  search: {
    searchresults: [],
    backbutton: false,
  },
};

const bigReducer = combineReducers({
  companies: favouritesReducer,
  search: searcharrayReducer,
});

const configureStore = createStore(
  bigReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ? composeEnhancers(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
);

export default configureStore;
