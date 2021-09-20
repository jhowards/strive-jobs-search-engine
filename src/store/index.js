import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import favouritesReducer from "../reducers/favourites";
import searcharrayReducer from "../reducers/searcharray";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";

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

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_ENCRYPT_KEY,
    }),
  ],
};

const bigReducer = combineReducers({
  companies: favouritesReducer,
  search: searcharrayReducer,
});

const persistedReducer = persistReducer(persistConfig, bigReducer);

export const configureStore = createStore(
  persistedReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ? composeEnhancers(applyMiddleware(thunk))
    : compose(applyMiddleware(thunk))
);

export const persistor = persistStore(configureStore);
