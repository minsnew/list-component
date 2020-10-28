import { RawListItem } from '../../models/listItem';
import { ListStoreAction, SET_SHOW_ONLY_FAVORITE, SET_FAVORITES } from './listStore-actions';

export interface ListStoreState {
  showOnlyFavorite: boolean;
  favoriteItems: RawListItem[];
}

// init state
const initState = () => ({
  showOnlyFavorite: false,
  favoriteItems: []
});

// reducer
export const ListReducer = (state: ListStoreState = initState(), action: ListStoreAction) => {

  switch (action.type) {
    case SET_SHOW_ONLY_FAVORITE: {
      return {
        ...state,
        showOnlyFavorite: action.data as boolean
      }
    }
    case SET_FAVORITES: {
      return {
        ...state,
        favoriteItems: action.data as RawListItem[]
      }
    }

    default: {
      return state;
    }
  }
};