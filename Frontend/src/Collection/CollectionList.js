import React, { Component } from "react";
import axios from 'axios';

import CollectionItem from "./CollectionItem";

class CollectionList extends Component {
  constructor(props) {
    super(props);

    this.onViewItem = this.onViewItem.bind(this);
  }

  render() {


    return (
      <div className='normalDiv'>
        <h1>{this.props.username}'s Collection</h1>
        <h2>{this.props.items.length}/{this.props.totalCount} Items Displayed</h2>
        <ul>
        {this.props.items.map((item, i) => (<li className='item' key={i}> <CollectionItem
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



export default CollectionList;
