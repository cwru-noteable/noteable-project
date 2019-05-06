import React, { Component } from "react";
import axios from 'axios';

import CollectionEditItemStats from "../CollectionEditItemStats";

class CollectionEditInkStats extends CollectionEditItemStats {
  constructor(props) {
    super(props);

    this.state = {
      color: this.props.stats.color,
    };
  }


  render() {
    return (
        <div>
          <h3>color:<input type='text'
            name={'color'}
            value={this.state.color}
            onChange={this.onInputChangeEvent}/></h3>
        </div>
    );
  }

}



export default CollectionEditInkStats;
