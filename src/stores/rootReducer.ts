import { combineReducers, Reducer, AnyAction } from "redux";
import { ListStoreState, ListReducer } from './listStore/listStore-reducer';

// interface for root reducer
export interface CombineReducers {
  ListReducer: ListStoreState
}

// root reducer
export const rootReducer: Reducer<CombineReducers, AnyAction> = combineReducers<CombineReducers>({
  ListReducer
});