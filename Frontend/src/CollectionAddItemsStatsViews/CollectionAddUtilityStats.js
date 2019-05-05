import React, { Component } from "react";
import axios from 'axios';

import CollectionAddItemStats from "../CollectionAddItemStats";

class CollectionAddUtilityStats extends CollectionAddItemStats {
  constructor(props) {
    super(props);

    this.state = {
      utilityType: '',
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



export default CollectionAddUtilityStats;
