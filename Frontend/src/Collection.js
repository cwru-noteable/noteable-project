import React, { Component } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";

import CollectionList from './CollectionList'
import CollectionFilter from './CollectionFilter'
import CollectionItemViewContainer from './CollectionItemViewContainer'


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
      basicAtts: {
        itemId: 0,
        itemName: '',
        manufacturer: ''
      },
      itemClosed: true,
      itemEditing: false,
      addingNewItem: false,
      items: [
        {itemId: 1, itemName: 'pen', manufacturer: 'man1'},
        {itemId: 2, itemName: 'pencil', manufacturer: 'man2'},
        {itemId: 3, itemName: 'mechanical pencil', manufacturer: 'man3'}
      ],
      stats: {},
      mechanicalPencils : true,
      fountainPens : true,
      cartridgePens : true,
      woodPencils : true,
      lead : true,
      replacements : true,
      ink : true,
      penCartridge : true,
      utility : true,
    };

    this.onViewItem = this.onViewItem.bind(this);
    this.onCloseItem = this.onCloseItem.bind(this);
    this.onEditItem = this.onEditItem.bind(this);
    this.onSaveItem = this.onSaveItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onAddNewItem = this.onAddNewItem.bind(this);

    this.onSaveNewItem = this.onSaveNewItem.bind(this);
    this.onCancelAddItem = this.onCancelAddItem.bind(this);
    this.loadFilteredCollection = this.loadFilteredCollection.bind(this);


  }

  render() {
    //TODO: GET list of items.
    this.loadFilteredCollection(2);

    return (
      <div class='container'>
        <div class = 'collectionViewDiv'>
          <div class = 'leftDiv'>
            <CollectionFilter
              onFilterInputChange={this.onInputChange}
              mechanicalPencils={this.state.mechanicalPencils}
              fountainPens={this.state.fountainPens}
              cartridgePens={this.state.cartridgePens}
              woodPencils={this.state.woodPencils}
              lead={this.state.lead}
              replacements={this.state.replacements}
              ink={this.state.ink}
              penCartridge={this.state.penCartridge}
              utility={this.state.utility}
            />
          </div>
          <div class = 'rightDiv'>
            <div class = 'rightDiv'>
              <button onClick={this.onAddNewItem}>Add Item</button>
            </div>
            <div class='leftDiv'>
              <CollectionList
                onViewItem={this.onViewItem}
                username={this.props.username}
                items={this.state.items}
              />
            </div>
          </div>
        </div>
        <div class='itemViewDiv'>
          <CollectionItemViewContainer
            onCancelAddItem={this.onCancelAddItem}
            onSaveNewItem={this.onSaveNewItem}
            onCloseItem={this.onCloseItem}
            onEditItem={this.onEditItem}
            onSaveItem={this.onSaveItem}
            onDeleteItem={this.onDeleteItem}
            onInputChange={this.onInputChange}
            itemClosed={this.state.itemClosed}
            itemEditing={this.state.itemEditing}
            addingNewItem={this.state.addingNewItem}
            username={this.props.username}
            basicAtts={this.state.basicAtts}
          />
          </div>
      </div>
    );
  }

  loadFilteredCollection(id) {
    console.log('hi');
    const base = 'http://172.20.27.214:3002';
    const path = '/users/'+id+'/collection';
    return axios.get(base + path, {
      mechP : this.state.mechanicalPencils,
      fountainPens : this.state.fountainPens,
      cartridgePens : this.state.cartridgePens,
      woodPencils : this.state.woodPencils,
      lead : this.state.lead,
      replacements : this.state.replacements,
      ink : this.state.ink,
      penCartridge : this.state.penCartridge,
      utility : this.state.utility,
    })
    .then(response => console.log(response));
  }

  onAddNewItem() {
    this.setState({addingNewItem: true});
  }

  onViewItem(item) {
    this.setState({
      basicAtts: {
        itemId: item.itemId,
        itemName: item.itemName,
        manufacturer: item.manufacturer
      },
      itemClosed: false,
      itemEditing: false,
      addingNewItem: false,
    });
  }

  onCloseItem() {
    this.setState({
      itemClosed: true,
      itemEditing: false,
    });
  }

  onEditItem() {
    this.setState({
      itemEditing: true,
    });
  }

  onDeleteItem(id) {
      // TODO DELETE item.
      // TODO after delete, GET items and send to item list.

      // Deleting Item
      // const base = 'http://172.20.27.214:3002';
      // const path = '/users/'+id+'/collection';
      // return axios.delete(base + path, {
      //   itemId: this.state.itemId
      // })
      // .then(response => console.log(response));

      //Reloading
      // this.loadFilteredCollection();

      this.onCloseItem();
  }

  onSaveItem() {
    // TODO UPDATE with info.
    // axios.

    // const base = 'http://172.20.27.214:3002';
    // const path = '/users/'+id+'/collection';
    // return axios.put(base + path, {
    //   itemId: this.state.itemId
    //   //type
    //   //generalAtts
    //   //Item-Specific Atts
    // })
    // .then(response => console.log(response));

    this.setState({
      itemEditing: false,
    });
  }

  onCancelAddItem() {
    this.setState({
      addingNewItem: false,
    })
  }

  onSaveNewItem() {
    //TODO POST with item info.

    // const base = 'http://172.20.27.214:3002';
    // const path = '/users/'+id+'/collection';
    // return axios.put(base + path, {
    //   itemId: this.state.itemId
    //   //type
    //   //generalAtts
    //   //Item-Specific Atts
    // })
    // .then(response => console.log(response));

    this.setState({
      addingNewItem: false,
    })
  }

  onInputChange(name, value) {
    this.setState({
      [name]: value
    }, () => {console.log(value);});

  }

}



export default Collection;
