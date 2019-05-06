import React, { Component } from "react";
import axios from 'axios';

import CollectionEditItemStats from "../CollectionEditItemStats";

class CollectionEditPenCartridgeStats extends CollectionEditItemStats {
  constructor(props) {
    super(props);

    this.state = {
      cartridgeType: this.props.stats.cartridgeType,
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



export default CollectionEditPenCartridgeStats;
