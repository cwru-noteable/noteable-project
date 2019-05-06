import React, { Component } from "react";
import axios from 'axios';

import CollectionAddItemStats from "../CollectionAddItemStats";

class CollectionAddCartridgePenStats extends CollectionAddItemStats {
  constructor(props) {
    super(props);

    this.state = {
      material: '',
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



export default CollectionAddCartridgePenStats;
