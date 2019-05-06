import React, { Component } from "react";
import axios from 'axios';

import CollectionViewItemStats from "../CollectionViewItemStats";

class CollectionViewLeadStats extends CollectionViewItemStats {
  constructor(props) {
    super(props);
  }


  render() {
    return (
        <div>
          <h3>leadSize:{this.props.stats.leadSize}</h3>
        </div>
    );
  }

}



export default CollectionViewLeadStats;
