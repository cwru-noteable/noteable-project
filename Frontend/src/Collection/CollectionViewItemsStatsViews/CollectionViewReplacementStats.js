import React, { Component } from "react";
import axios from 'axios';

import CollectionViewItemStats from "../CollectionViewItemStats";

class CollectionViewReplacementStats extends CollectionViewItemStats {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <div>
          <h3>replacementType:{this.props.stats.replacementType}</h3>
        </div>
    );
  }

}



export default CollectionViewReplacementStats;
