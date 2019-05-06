import React, { Component } from "react";
import axios from 'axios';

import CollectionViewItemStats from "../CollectionViewItemStats";

class CollectionViewFountainPenStats extends CollectionViewItemStats {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <div>
          <h3>material:{this.props.stats.material}</h3>
          <h3>inkType:{this.props.stats.inkType}</h3>
        </div>
    );
  }

}



export default CollectionViewFountainPenStats;
