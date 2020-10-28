import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  storage
};
const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default createStore(enhancedReducer, composeWithDevTools(applyMiddleware(thunk)));