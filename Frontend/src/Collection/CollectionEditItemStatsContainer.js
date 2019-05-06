import React, { Component } from "react";
import axios from 'axios';

import CollectionEditCartridgePenStats from "./CollectionEditItemsStatsViews/CollectionEditCartridgePenStats";
import CollectionEditFountainPenStats from "./CollectionEditItemsStatsViews/CollectionEditFountainPenStats";
import CollectionEditInkStats from "./CollectionEditItemsStatsViews/CollectionEditInkStats";
import CollectionEditLeadStats from "./CollectionEditItemsStatsViews/CollectionEditLeadStats";
import CollectionEditMechanicalPencilStats from "./CollectionEditItemsStatsViews/CollectionEditMechanicalPencilStats";
import CollectionEditPenCartridgeStats from "./CollectionEditItemsStatsViews/CollectionEditPenCartridgeStats";
import CollectionEditReplacementStats from "./CollectionEditItemsStatsViews/CollectionEditReplacementStats";
import CollectionEditUtilityStats from "./CollectionEditItemsStatsViews/CollectionEditUtilityStats";
import CollectionEditWoodPencilStats from "./CollectionEditItemsStatsViews/CollectionEditWoodPencilStats";


class CollectionEditItemStatsContainer extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = this.onInputChange.bind(this);
  }


  render() {

    switch (this.props.type) {
      case "cartridgePen":
        return(<CollectionEditCartridgePenStats stats={this.props.stats} onInputChange= {this.onInputChange}/>);
        break;
      case "fountainPen":
        return(<CollectionEditFountainPenStats stats={this.props.stats} onInputChange= {this.onInputChange}/>);
        break;
      case "ink":
        return(<CollectionEditInkStats stats={this.props.stats} onInputChange= {this.onInputChange}/>);
        break;
      case "lead":
        return(<CollectionEditLeadStats stats={this.props.stats} onInputChange= {this.onInputChange}/>);
        break;
      case "mechanicalPencil":
        return(<CollectionEditMechanicalPencilStats stats={this.props.stats} onInputChange= {this.onInputChange}/>);
        break;
      case "penCartridge":
        return(<CollectionEditPenCartridgeStats stats={this.props.stats} onInputChange= {this.onInputChange}/>);
        break;
      case "replacement":
        return(<CollectionEditReplacementStats stats={this.props.stats} onInputChange= {this.onInputChange}/>);
        break;
      case "utility":
        return(<CollectionEditUtilityStats stats={this.props.stats} onInputChange= {this.onInputChange}/>);
        break;
      case "woodPencil":
        return(<CollectionEditWoodPencilStats stats={this.props.stats} onInputChange= {this.onInputChange}/>);
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



export default CollectionEditItemStatsContainer;
