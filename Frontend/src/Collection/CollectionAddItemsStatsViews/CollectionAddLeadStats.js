import React, { Component } from "react";
import axios from 'axios';

import CollectionAddItemStats from "../CollectionAddItemStats";

class CollectionAddLeadStats extends CollectionAddItemStats {
  constructor(props) {
    super(props);

    this.state = {
      leadSize: 0,
    };
  }


  render() {
    return (
        <div>
          <h3>leadSize:<input type='text'
            name={'leadSize'}
            value={this.state.leadSize}
            onChange={this.onInputChangeEvent}/></h3>
        </div>
    );
  }

}



export default CollectionAddLeadStats;
