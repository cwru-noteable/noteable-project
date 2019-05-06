import React, { Component } from "react";
import axios from 'axios';

import GalleryItem from "./GalleryItem";

class GalleryList extends Component {
  constructor(props) {
    super(props);

    this.onViewItem = this.onViewItem.bind(this);
  }

  render() {


    return (
      <div className='normalDiv'>
        <h2>Collection List</h2>
        <ul>
        {this.props.items.map((item, i) => (<li className='item' key={i}> <GalleryItem
          onViewItem={this.onViewItem}
          item={item}
          username={this.props.username}
          key={i}/></li>))}
        </ul>
      </div>
    );
  }

  onViewItem(item) {
    this.props.onViewItem(item);
  }

}



export default GalleryList;
