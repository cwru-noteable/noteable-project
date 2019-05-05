import React, { Component } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";

import CollectionAddItemView from './CollectionAddItemView'
import CollectionItemView from './CollectionItemView'


import {
  Route,
  HashRouter,
  Switch,
  Redirect
} from "react-router-dom";

class CollectionItemViewContainer extends Component {
  constructor(props) {
    super(props);

    this.onCancelAddItem = this.onCancelAddItem.bind(this);
    this.onSaveNewItem = this.onSaveNewItem.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.onCloseItem = this.onCloseItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
  }

  render() {
    if (this.props.addingNewItem) {
      return (
        <CollectionAddItemView
          onCancelAddItem={this.onCancelAddItem}
          onSaveNewItem={this.onSaveNewItem}
          onInputChange={this.onInputChange}
          itemClosed={this.props.itemClosed}
          username={this.props.username}

        />
      );
    }
    else if (this.props.itemClosed) {
      return (
        <div>
        </div>
      );
    }
    else {
      return (
        <CollectionItemView
          onCloseItem={this.onCloseItem}
          onEditItem={this.onEditItem}
          onSaveItem={this.onSaveItem}
          onDeleteItem={this.onDeleteItem}
          onInputChange={this.onInputChange}
          itemEditing={this.props.itemEditing}
          username={this.props.username}
          basicAtts={this.props.basicAtts}
        />
      );
    }
  }

  onCancelAddItem() {
    this.props.onCancelAddItem();
  }

  onSaveNewItem() {
    this.props.onSaveNewItem();
  }

  onCloseItem() {
    this.props.onCloseItem();
  }

  onEditItem() {
    this.props.onEditItem();
  }

  onSaveItem() {
    this.props.onSaveItem();
  }

  onDeleteItem() {
    this.props.onDeleteItem();
  }

  onInputChange(name, value) {
    this.props.onInputChange(name, value);
  }


}



export default CollectionItemViewContainer;
