import React, { Component } from "react";
import axios from 'axios';

import CollectionViewCartridgePenStats from "./CollectionViewItemsStatsViews/CollectionViewCartridgePenStats";
import CollectionViewFountainPenStats from "./CollectionViewItemsStatsViews/CollectionViewFountainPenStats";
import CollectionViewInkStats from "./CollectionViewItemsStatsViews/CollectionViewInkStats";
import CollectionViewLeadStats from "./CollectionViewItemsStatsViews/CollectionViewLeadStats";
import CollectionViewMechanicalPencilStats from "./CollectionViewItemsStatsViews/CollectionViewMechanicalPencilStats";
import CollectionViewPenCartridgeStats from "./CollectionViewItemsStatsViews/CollectionViewPenCartridgeStats";
import CollectionViewReplacementStats from "./CollectionViewItemsStatsViews/CollectionViewReplacementStats";
import CollectionViewUtilityStats from "./CollectionViewItemsStatsViews/CollectionViewUtilityStats";
import CollectionViewWoodPencilStats from "./CollectionViewItemsStatsViews/CollectionViewWoodPencilStats";


class CollectionViewItemStatsContainer extends Component {
  constructor(props) {
    super(props);
  }


  render() {

    switch (this.props.type) {
      case "cartridgePen":
        return(<CollectionViewCartridgePenStats stats= {this.props.stats}/>);
        break;
      case "fountainPen":
        return(<CollectionViewFountainPenStats stats= {this.props.stats}/>);
        break;
      case "ink":
        return(<CollectionViewInkStats stats= {this.props.stats}/>);
        break;
      case "lead":
        return(<CollectionViewLeadStats stats= {this.props.stats}/>);
        break;
      case "mechanicalPencil":
        return(<CollectionViewMechanicalPencilStats stats= {this.props.stats}/>);
        break;
      case "penCartridge":
        return(<CollectionViewPenCartridgeStats stats= {this.props.stats}/>);
        break;
      case "replacement":
        return(<CollectionViewReplacementStats stats= {this.props.stats}/>);
        break;
      case "utility":
        return(<CollectionViewUtilityStats stats= {this.props.stats}/>);
        break;
      case "woodPencil":
        return(<CollectionViewWoodPencilStats stats= {this.props.stats}/>);
        break;
    }
    return (
        <div>
        </div>
    );
  }

}



export default CollectionViewItemStatsContainer;
