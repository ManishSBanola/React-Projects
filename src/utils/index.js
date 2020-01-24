import { applyMiddleware, createStore } from "redux";
import { middlewares } from "../components/createStore";
import rootReducer from "../Reducers";
export const testStore = initialState => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
