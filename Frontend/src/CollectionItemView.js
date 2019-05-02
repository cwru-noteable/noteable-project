import React, { Component } from "react";
import axios from 'axios';

class CollectionItemView extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.name}</h2>
      </div>
    );
  }

}



export default CollectionItemView;
