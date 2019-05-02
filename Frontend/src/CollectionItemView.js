import React, { Component } from "react";
import axios from 'axios';

import CollectionItem from "./CollectionItem";

class CollectionItemView extends Component {
  render() {
    const items = [{id: 1, name: 'pen', quantity: 1}];
    return (
      <div>
        <h2>ITEM</h2>
        {items.map((item, i) => React.createElement(CollectionItem, {id:item.id, name:item.name, quantity:item.quantity, username: this.props.username, key: i}))}
      </div>
    );
  }

}



export default CollectionItemView;
