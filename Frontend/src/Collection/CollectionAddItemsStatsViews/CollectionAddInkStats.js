import React, { Component } from "react";
import axios from 'axios';

import CollectionAddItemStats from "../CollectionAddItemStats";

class CollectionAddInkStats extends CollectionAddItemStats {
  constructor(props) {
    super(props);

    this.state = {
      color: '',
    };
  }


  render() {
    return (
        <div>
          <h3>color:<input type='text'
            name={'color'}
            value={this.state.color}
            onChange={this.onInputChangeEvent}/></h3>
        </div>
    );
  }

}



export default CollectionAddInkStats;
