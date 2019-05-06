import React, { Component } from "react";
import axios from 'axios';

import CollectionViewItemStats from "../CollectionViewItemStats";

class CollectionViewWoodPencilStats extends CollectionViewItemStats {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <div>
          <h3>material:{this.props.stats.material}</h3>
        </div>
    );
  }

}



export default CollectionViewWoodPencilStats;
