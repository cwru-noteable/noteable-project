import React, { Component } from "react";
import axios from 'axios';

import CollectionAddItemStats from "../CollectionAddItemStats";

class CollectionAddPenCartridgeStats extends CollectionAddItemStats {
  constructor(props) {
    super(props);

    this.state = {
      cartridgeType: 0,
    };
  }


  render() {
    return (
        <div>
          <h3>cartridgeType:<input type='number'
            name={'cartridgeType'}
            value={this.state.cartridgeType}
            onChange={this.onInputChangeEvent}/></h3>
        </div>
    );
  }

}



export default CollectionAddPenCartridgeStats;
