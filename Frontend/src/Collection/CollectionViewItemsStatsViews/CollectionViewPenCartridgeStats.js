import React, { Component } from "react";
import axios from 'axios';

import CollectionViewItemStats from "../CollectionViewItemStats";

class CollectionViewPenCartridgeStats extends CollectionViewItemStats {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <div>
          <h3>cartridgeType:{this.props.stats.cartridgeType}</h3>
        </div>
    );
  }

}



export default CollectionViewPenCartridgeStats;
