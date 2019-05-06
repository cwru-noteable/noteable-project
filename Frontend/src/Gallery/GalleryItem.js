import React, { Component } from "react";
import axios from 'axios';

import {
  Link
} from "react-router-dom";

class GalleryItem extends Component {
  constructor(props) {
    super(props);

    this.onViewItem = this.onViewItem.bind(this);
  }

  render() {
    const items = []
    return (
      <div className='itemDiv'>
        <h3>{this.props.item.basicAtts.itemName}</h3>
        <button onClick={this.onViewItem}>View</button>
      </div>
    );
  }

  onViewItem() {
    this.props.onViewItem(this.props.item);
  }



}



export default GalleryItem;
