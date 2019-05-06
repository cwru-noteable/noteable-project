import React, { Component } from "react";
import axios from 'axios';

import CollectionAddItemStats from "../CollectionAddItemStats";

class CollectionAddFountainPenStats extends CollectionAddItemStats {
  constructor(props) {
    super(props);

    this.state = {
      material: '',
      inkType: '',
    };
  }


  render() {
    return (
        <div>
          <h3>material:<input type='text'
            name={'material'}
            value={this.state.material}
            onChange={this.onInputChangeEvent}/></h3>
          <h3>inkType:<input type='text'
            name={'inkType'}
            value={this.state.inkType}
            onChange={this.onInputChangeEvent}/></h3>
        </div>
    );
  }

}



export default CollectionAddFountainPenStats;
