import React, { Component } from "react";
import axios from 'axios';

import {
  Link
} from "react-router-dom";

class CollectionItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      name: props.name,
      quantity: props.quantity,
    };

    this.onViewItem = this.onViewItem.bind(this);
  }

  render() {
    const items = []
    return (
      <div>
        <p>NAME:{this.state.name}</p>
        <p>ID:{this.state.id}</p>
        <p>QUANTITY:{this.state.quantity}</p>
        <Link to={'/hub/collections/' + this.props.username + '/item/' + this.state.id}> <button onClick={this.onViewItem}>View</button> </Link>
      </div>
    );
  }

  onViewItem() {
    this.props.onViewItem(this.state);
  }



}



export default CollectionItem;
