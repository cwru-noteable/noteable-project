import React, { Component } from "react";
import axios from 'axios';

import CollectionEditItemStats from "../CollectionEditItemStats";

class CollectionEditMechanicalPencilStats extends CollectionEditItemStats {
  constructor(props) {
    super(props);

    this.state = {
      material: this.props.stats.material,
      leadSize: this.props.stats.leadSize,
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



export default CollectionEditMechanicalPencilStats;
