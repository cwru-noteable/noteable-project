import React, { Component } from "react";
import axios from 'axios';
import ReactDOM from "react-dom";
import cloneDeep from 'lodash/cloneDeep';

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
      item: {
        basicAtts: {
          itemId: 0,
          itemName: '',
          type: '',
          manufacturer: ''
        },
        stats: {}
      },
      newItem: {
        basicAtts: {
          itemId: 0,
          itemName: '',
          type: '',
          manufacturer: ''
        },
        stats: {}
      },
      itemClosed: true,
      itemEditing: false,
      addingNewItem: false,
      items: [
        {basicAtts:{itemId: 1, itemName: 'pen', manufacturer: 'man1', type: 'cartridgePen'},
        stats: {material: 'plastic'}},
        {basicAtts:{itemId: 2, itemName: 'pencil', manufacturer: 'man2', type: 'woodPencil'},
        stats: {material: 'wood'}},
        {basicAtts:{itemId: 3, itemName: 'mechanical pencil', manufacturer: 'man3', type: 'mechanicalPencil'},
        stats: {material: 'metal', leadSize: 4}}
      ],
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

    this.onFilterInputChange = this.onFilterInputChange.bind(this);

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
    this.loadFilteredCollection();

    return (
      <div className='container'>
        <div className = 'collectionViewDiv'>
          <div className = 'leftDiv'>
            <CollectionFilter
              onFilterInputChange={this.onFilterInputChange}
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
          <div className = 'rightDiv'>
            <div className = 'rightDiv'>
              <button onClick={this.onAddNewItem}>Add Item</button>
            </div>
            <div className='leftDiv'>
              <CollectionList
                onViewItem={this.onViewItem}
                username={this.props.username}
                items={this.state.items}
              />
            </div>
          </div>
        </div>
        <div className='itemViewDiv'>
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
            item={this.state.item}
            newItem={this.state.newItem}
          />
          </div>
      </div>
    );
  }

  loadFilteredCollection() {
    const port = '3002';
    const base = 'http://172.20.17.194:'+port;
    const path = '/collection/' + this.props.username;
    return axios.get(base + path, {
      mechanicalPencils : this.state.mechanicalPencils,
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
    this.setState({
      addingNewItem: true,
      itemClosed: true,
      itemEditing: false,
    });
  }

  onViewItem(item) {
    this.setState({
      item: item,
      newItem: cloneDeep(item),
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

  onDeleteItem() {
      // TODO DELETE item.
      // TODO after delete, GET items and send to item list.
      //
      // Deleting Item
      // const base = 'http://172.20.27.214:3002';
      // const path = '/collection/'+this.props.username+'/item';
      // return axios.delete(base + path, {
      //   itemId: this.state.item.basicAtts.itemId,
      //   type: this.state.item.basicAtts.type
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
    // return axios.put(base + path, this.state.newItem)
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
    // const path = '/collection/'+this.props.username+'/item';
    // return axios.put(base + path, newItem)
    // .then(response => console.log(response));

    this.setState({
      addingNewItem: false,
    })
  }

  onInputChange(name, value) {
    this.setState({
      [name]: value
    });
  }

  onFilterInputChange(name, value) {
    this.setState({
      [name]: value
    }, () => {this.loadFilteredCollection()});
  }

}



export default Collection;
