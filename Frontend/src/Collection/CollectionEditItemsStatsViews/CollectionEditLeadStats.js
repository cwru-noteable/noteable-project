import React, { Component } from "react";
import axios from 'axios';

import CollectionEditItemStats from "../CollectionEditItemStats";

class CollectionEditLeadStats extends CollectionEditItemStats {
  constructor(props) {
    super(props);

    this.state = {
      leadSize: this.props.stats.leadSize,
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



export default CollectionEditLeadStats;
