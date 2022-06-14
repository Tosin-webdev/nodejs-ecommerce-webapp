import data from "./data";
import { legacy_createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
const initialState = {};
const reducer = (state, action) => {
  return { products: data.products };
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
