import React, { Component } from "react";
import axios from 'axios';

import CollectionAddItemStats from "../CollectionAddItemStats";

class CollectionAddReplacementStats extends CollectionAddItemStats {
  constructor(props) {
    super(props);

    this.state = {
      replacementType: '',
    };
  }


  render() {
    return (
        <div>
          <h3>replacementType:<input type='text'
            name={'replacementType'}
            value={this.state.replacementType}
            onChange={this.onInputChangeEvent}/></h3>
        </div>
    );
  }

}



export default CollectionAddReplacementStats;
