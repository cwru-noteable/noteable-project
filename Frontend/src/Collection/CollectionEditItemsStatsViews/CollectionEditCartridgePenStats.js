import React, { Component } from "react";
import axios from 'axios';

import CollectionEditItemStats from "../CollectionEditItemStats";

class CollectionEditCartridgePenStats extends CollectionEditItemStats {
  constructor(props) {
    super(props);

    this.state = {
      material: this.props.stats.material,
    };
  }


  render() {
    return (
        <div>
          <h3>material:<input type='text'
            name={'material'}
            value={this.state.material}
            onChange={this.onInputChangeEvent}/></h3>
        </div>
    );
  }

}



export default CollectionEditCartridgePenStats;
