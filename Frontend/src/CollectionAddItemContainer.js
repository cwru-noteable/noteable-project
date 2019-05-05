import React, { Component } from "react";
import axios from 'axios';

import CollectionAddCartridgePenStats from "./CollectionAddItemsStatsViews/CollectionAddCartridgePenStats";
import CollectionAddFountainPenStats from "./CollectionAddItemsStatsViews/CollectionAddFountainPenStats";
import CollectionAddInkStats from "./CollectionAddItemsStatsViews/CollectionAddInkStats";
import CollectionAddLeadStats from "./CollectionAddItemsStatsViews/CollectionAddLeadStats";
import CollectionAddMechanicalPencilStats from "./CollectionAddItemsStatsViews/CollectionAddMechanicalPencilStats";
import CollectionAddPenCartridgeStats from "./CollectionAddItemsStatsViews/CollectionAddPenCartridgeStats";
import CollectionAddReplacementStats from "./CollectionAddItemsStatsViews/CollectionAddReplacementStats";
import CollectionAddUtilityStats from "./CollectionAddItemsStatsViews/CollectionAddUtilityStats";
import CollectionAddWoodPencilStats from "./CollectionAddItemsStatsViews/CollectionAddWoodPencilStats";


class CollectionAddItemContainer extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
  }


  render() {

    console.log('test');
    switch (this.props.type) {
      case "cartridgePen":
        return(<CollectionAddCartridgePenStats onInputChange= {this.onInputChange}/>);
        break;
      case "fountainPen":
        return(<CollectionAddFountainPenStats onInputChange= {this.onInputChange}/>);
        break;
      case "ink":
        return(<CollectionAddInkStats onInputChange= {this.onInputChange}/>);
        break;
      case "lead":
        return(<CollectionAddLeadStats onInputChange= {this.onInputChange}/>);
        break;
      case "mechanicalPencil":
        return(<CollectionAddMechanicalPencilStats onInputChange= {this.onInputChange}/>);
        break;
      case "penCartridge":
        return(<CollectionAddPenCartridgeStats onInputChange= {this.onInputChange}/>);
        break;
      case "replacement":
        return(<CollectionAddReplacementStats onInputChange= {this.onInputChange}/>);
        break;
      case "utility":
        return(<CollectionAddUtilityStats onInputChange= {this.onInputChange}/>);
        break;
      case "woodPencil":
        return(<CollectionAddWoodPencilStats onInputChange= {this.onInputChange}/>);
        break;
    }
    return (
        <div>
        </div>
    );
  }

  onInputChange(name, value) {
    this.props.onInputChange(name, value);
  }

}



export default CollectionAddItemContainer;
