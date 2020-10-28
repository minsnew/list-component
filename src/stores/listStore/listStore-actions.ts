import { RawListItem } from '../../models/listItem';

// define actions
export const SET_FAVORITES = 'SET_FAVORITES';
export const SET_SHOW_ONLY_FAVORITE = 'SET_SHOW_ONLY_FAVORITE';

// interface for action
export interface ListStoreAction {
  type: string;
  data: any;
}

// set favorites
export const SetFavorites = (favorites: RawListItem[]) => ({
  type: SET_FAVORITES,
  data: favorites
})

// set show only favorite
export const SetShowOnlyFavorite = (show: boolean) => ({
  type: SET_SHOW_ONLY_FAVORITE,
  data: show
});