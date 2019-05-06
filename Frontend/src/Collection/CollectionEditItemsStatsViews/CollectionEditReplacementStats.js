import React, { Component } from "react";
import axios from 'axios';

import CollectionEditItemStats from "../CollectionEditItemStats";

class CollectionEditReplacementStats extends CollectionEditItemStats {
  constructor(props) {
    super(props);

    this.state = {
      replacementType: this.props.stats.replacementType,
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



export default CollectionEditReplacementStats;
