import React, { Component } from "react";
import axios from 'axios';

import CollectionAddItemStats from "../CollectionAddItemStats";

class CollectionAddMechanicalPencilStats extends CollectionAddItemStats {
  constructor(props) {
    super(props);

    this.state = {
      material: '',
      leadSize: 0,
    };
  }


  render() {
    return (
        <div>
          <h3>material:<input type='text'
            name={'material'}
            value={this.state.material}
            onChange={this.onInputChangeEvent}/></h3>
          <h3>leadSize:<input type='text'
            name={'leadSize'}
            value={this.state.leadSize}
            onChange={this.onInputChangeEvent}/></h3>
        </div>
    );
  }

}



export default CollectionAddMechanicalPencilStats;
