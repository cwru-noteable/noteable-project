import React, { Component } from "react";
import axios from 'axios';

import {
  Link
} from "react-router-dom";

class CollectionItem extends Component {
  constructor(props) {
    super(props);

    this.onViewItem = this.onViewItem.bind(this);
  }

  render() {
    const items = []
    return (
      <div class='itemDiv'>
        <h3>{this.props.item.itemName}</h3>
        <button onClick={this.onViewItem}>View</button>
      </div>
    );
  }

  onViewItem() {
    this.props.onViewItem(this.props.item);
  }



}



export default CollectionItem;
