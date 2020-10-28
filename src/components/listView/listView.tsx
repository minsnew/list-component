import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import ListItem from '../listItem/listItem';
import { RawListItem } from '../../models/listItem';
import stores from '../../stores';
import './listView.css';
import { SetFavorites } from '../../stores/listStore/listStore-actions';

interface ListViewProps {}

interface ListViewStates {
  items: RawListItem[];
  pageNumber: number;
  hasMore: boolean;
}

class ListView extends React.Component<ListViewProps, ListViewStates> {
  // constructor
  constructor(props: ListViewProps) {
    super(props);

    this.state = {
      items: [],
      pageNumber: 1,
      hasMore: true
    };
    
    // binding functions
    this.readImageData = this.readImageData.bind(this);
  }

  componentWillMount() {
    // read image json data
    this.readImageData();
  }

  // read image json data
  readImageData() {
    // read image json
    fetch(`https://bucketplace-coding-test.s3.amazonaws.com/cards/page_${this.state.pageNumber}.json`)
     .then(res => res.json())
     .then(data => {
        if (data) {
          this.setState({
            //update items
            items: [...this.state.items, ...data],
            //update page number
            pageNumber: this.state.pageNumber + 1
          })
        } else {
          this.setState({
            // update has more flag
            hasMore: false
          })
        }
      });
  }

  onChangeShowOnlyFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({items: []});
    if (e.target.checked) {
      this.setState({
        items: stores.getState().ListReducer.favoriteItems,
        pageNumber: 1,
        hasMore: true
      })
    } else {
      this.readImageData();
    }
  }

  onClickClearFavorite = () => {
    stores.dispatch(SetFavorites([]));
    this.readImageData();
  }

  render() {
    return (
      <div className='list-view-container'>
        <div className='list-view-header'>
          <input className='checkbox-clip' type='checkbox' onChange={this.onChangeShowOnlyFavorite}></input>
          <div className='label-clip'>스크랩한 것만 보기</div>
          <div className='btn-favorite-clear' onClick={this.onClickClearFavorite}>Clear</div>
        </div>
        <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.readImageData}
            hasMore={this.state.hasMore}
            loader={""}
          >
          {this.state.items.map((item, index) => (
            <ListItem data={item} key={index}></ListItem>
          ))}
        </InfiniteScroll>
      </div>
    )
  }
}

export default ListView;