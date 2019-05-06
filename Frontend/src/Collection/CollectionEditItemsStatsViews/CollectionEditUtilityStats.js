import React, { Component } from "react";
import axios from 'axios';

import CollectionEditItemStats from "../CollectionEditItemStats";

class CollectionEditUtilityStats extends CollectionEditItemStats {
  constructor(props) {
    super(props);

    this.state = {
      utilityType: this.props.stats.utilityType,
    };
  }


  render() {
    return (
        <div>
          <h3>utilityType:<input type='text'
            name={'utilityType'}
            value={this.state.utilityType}
            onChange={this.onInputChangeEvent}/></h3>
        </div>
    );
  }

}



export default CollectionEditUtilityStats;
