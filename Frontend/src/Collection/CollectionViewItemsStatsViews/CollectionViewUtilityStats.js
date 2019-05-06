import React, { Component } from "react";
import axios from 'axios';

import CollectionViewItemStats from "../CollectionViewItemStats";

class CollectionViewUtilityStats extends CollectionViewItemStats {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <div>
          <h3>utilityType:{this.props.stats.utilityType}</h3>
        </div>
    );
  }

}



export default CollectionViewUtilityStats;
