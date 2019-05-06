import React, { Component } from "react";
import axios from 'axios';

import CollectionEditItemStatsContainer from './CollectionEditItemStatsContainer';
import CollectionViewItemStatsContainer from './CollectionViewItemStatsContainer';

class CollectionItemView extends Component {
  constructor(props) {
    super(props);

    this.onCloseItem = this.onCloseItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChangeEvent = this.onInputChangeEvent.bind(this);
  }

  render() {
    if (!this.props.itemEditing){
      return (
        <div>
          <div className="leftDiv">
            <button onClick={this.onEditItem}>Edit</button>
            <button onClick={this.onDeleteItem}>Delete</button>
          </div>
          <div className='rightDiv'>
            <div className="leftDiv">
              <h1>{this.props.item.basicAtts.itemName}</h1>
              <h2>ID: {this.props.item.basicAtts.itemId}</h2>
              <h2>Type: {this.props.item.basicAtts.type}</h2>
              <h2>Manufacturer: {this.props.item.basicAtts.manufacturer}</h2>
              <CollectionViewItemStatsContainer
                type={this.props.item.basicAtts.type}
                stats={this.props.item.stats}
              />
            </div>
            <div className="rightDiv">
              <button onClick={this.onCloseItem}>Close</button>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <form onSubmit={this.onSaveItem}>
          <div className="leftDiv">
            <input type='submit' value='Save'/>
          </div>
          <div className='rightDiv'>
            <div className="leftDiv">
              <h1>Name:</h1>
              <input
                type='text'
                name={'itemName'}
                value={this.props.newItem.basicAtts.itemName}
                onChange={this.onInputChangeEvent}/>
              <h2>ID: {this.props.newItem.basicAtts.itemId}</h2>
              <h2>Type: {this.props.newItem.basicAtts.type}</h2>
              <h2>Manufacturer:</h2>
              <input
                type='text'
                name={'manufacturer'}
                value={this.props.newItem.basicAtts.manufacturer}
                onChange={this.onInputChangeEvent}/>
              <CollectionEditItemStatsContainer
                type={this.props.newItem.basicAtts.type}
                stats={this.props.newItem.stats}
                onInputChange={this.onInputChange}
              />
            </div>
            <div className="rightDiv">
              <button onClick={this.onCloseItem}>Close</button>
            </div>
          </div>
        </form>
      );
    }

  }

  onCloseItem() {
    this.props.onCloseItem();
  }

  onEditItem() {
    this.props.onEditItem();
  }

  onDeleteItem() {
    //DELETE item here.
    this.props.onDeleteItem();
  }

  onSaveItem() {
    //TODO PUT item here.
    this.props.onSaveItem();
  }

  onInputChangeEvent(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.onInputChange(name, value);
  }

  onInputChange(name, value) {


    const newItem = this.props.newItem;
    var updatedItem = newItem;
    if (name === "itemId" || name === "itemName" || name === "type" || name === "manufacturer") {
      updatedItem.basicAtts = {
          ...updatedItem.basicAtts,
          [name]: value
        };
    }
    else {
      updatedItem.stats = value;
    }

    this.props.onInputChange("newItem", updatedItem);
  }

}



export default CollectionItemView;
