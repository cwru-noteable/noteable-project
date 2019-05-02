import React, { Component } from "react";
import axios from 'axios';

import CollectionList from './CollectionList'
import CollectionFilter from './CollectionFilter'
import CollectionItemView from './CollectionItemView'


import {
  Route,
  HashRouter,
  Switch,
  Redirect
} from "react-router-dom";

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: 0,
      itemName: '',
      itemQuantity: 0,
    };

    this.onViewItem = this.onViewItem.bind(this);
  }

  render() {
    return (
      <HashRouter>
        <h2>Your Collection!</h2>
          <div class = 'leftDiv'>
            <CollectionFilter/>
            <CollectionList onViewItem={this.onViewItem} username={this.props.username}/>
          </div>
          <div class = 'rightDiv'>
            <Route path={'/hub/collections/' + this.props.username + '/item'} render={(props) => <CollectionItemView username={this.props.username} id={this.state.itemId} name={this.state.itemName} quantity={this.state.itemQuantity}/>}/>
          </div>
      </HashRouter>
    );
  }

  loadEntireOtherCollection(id) {
    const base = '';
    return axios.get(base + '/OthColl/' + id)
    .then(response => console.log(response));
  }

  loadEntireImplementCollection(id) {
    const base = '';
    return axios.get(base + '/ImpColl/' + id)
    .then(response => console.log(response));
  }

  onViewItem(item) {
    this.state.itemId = item.id;
    this.state.itemName = item.name;
    this.state.itemQuantity = item.quantity;
  }

}



export default Collection;
