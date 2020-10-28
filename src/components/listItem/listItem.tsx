import React from 'react';
import { RawListItem } from '../../models/listItem';
import { AvatarIcon, FavoriteIcon, FavoriteSelectedIcon } from '../icons/icons';
import stores from '../../stores';
import { SetFavorites } from '../../stores/listStore/listStore-actions';
import './listItem.css';

interface ListItemProps {
 data: RawListItem;
}

interface ListItemStates {
  isSelected: boolean;
}

class ListItem extends React.Component<ListItemProps, ListItemStates> {
  constructor(props: ListItemProps) {
    super(props);

    this.state = {
      isSelected: false
    }

    this.setIsSelected = this.setIsSelected.bind(this);
  }

  componentDidMount() {
    if (this.props.data) {
      const favoriteItems = stores.getState().ListReducer.favoriteItems;
      if (favoriteItems) {
        for(let i = 0; i < favoriteItems.length; i++) {
          const item = favoriteItems[i];
          if (this.props.data.id === item.id) {
            this.setIsSelected(true);
          }
        }
      }
    }
  }

  setIsSelected(isSelected: boolean) {
    this.setState({
      isSelected: isSelected
    });
  }

  appendFavorite = (item: RawListItem) => {
    let items = stores.getState().ListReducer.favoriteItems;
    if (items) {
      items.push(item);
      stores.dispatch( SetFavorites(items) );
    } else {
      const i = [];
      i.push(item);
      stores.dispatch( SetFavorites(i) );
    }
    console.log("TEST", items);
  }

  removeFavorite = (item: RawListItem) => {
    let items = stores.getState().ListReducer.favoriteItems;
    let isFound = false;
    for(let i = 0; i < items.length; i++) {
      const found = items[i];
      if (item.id === found.id) {
        items.splice(i, 1);
        stores.dispatch( SetFavorites(items) );
        isFound = true;
      }
    }

    if (!isFound) {
      console.error("Can't find favorite. id = " + item.id);
      alert("Can't find favorite. id = " + item.id);
    }
  }

  // on click favorite event handler
  onClickFavorite = (item: RawListItem) => (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const isSelected = !this.state.isSelected;
    if (isSelected) {
      this.appendFavorite(item);
    } else {
      this.removeFavorite(item);
    }

    this.setIsSelected(isSelected);
  }

  // render
  render() {
    return (
      <div className="list-item-container">
        <div className="list-item-header">
          <div className="list-item-avatar">
            <AvatarIcon></AvatarIcon>
          </div>
          <div className="list-item-nickname">{this.props.data.nickname}</div>
        </div>
        <div className="list-item-img-wrap" style={{backgroundImage: "url(" + this.props.data.image_url + ")"}}>
          {!this.state.isSelected ? (
            <FavoriteIcon className='favorite-icon'
              onClick={this.onClickFavorite(this.props.data)}></FavoriteIcon>
          ) : (
            <FavoriteSelectedIcon className='favorite-icon'
              onClick={this.onClickFavorite(this.props.data)}></FavoriteSelectedIcon>
          )}
        </div>
      </div>
    )
  }
}

export default ListItem;