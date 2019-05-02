import React, { Component } from "react";
import axios from 'axios';

import CollectionItem from "./CollectionItem";

class CollectionList extends Component {
  constructor(props) {
    super(props);

    this.onViewItem = this.onViewItem.bind(this);
  }

  render() {
    const items = [{id: 1, name: 'pen', quantity: 1},
                  {id: 2, name: 'pencil', quantity: 2},
                  {id: 3, name: 'mechanical pencil', quantity: 1}];
    return (
      <div>
        <h2>Collection List</h2>
        {items.map((item, i) => React.createElement(CollectionItem, {onViewItem:this.onViewItem, id:item.id, name:item.name, quantity:item.quantity, username: this.props.username, key: i}))}
      </div>
    );
  }

  onViewItem(item) {
    this.props.onViewItem(item);
  }

}



export default CollectionList;
