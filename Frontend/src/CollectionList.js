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
      <div class='normalDiv'>
        <h2>Collection List</h2>
        <ul>
        {this.props.items.map((item, i) => (<li class='item'> <CollectionItem
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
