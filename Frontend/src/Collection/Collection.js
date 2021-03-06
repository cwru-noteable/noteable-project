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


const port = '3002';
const base = 'http://localhost';

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
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
      totalCount: 0,
      items: [],
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

    this.loadCount = this.loadCount.bind(this);
  }

  render() {

    if (!this.state.init) {
      this.setState({init: true}, () => this.loadFilteredCollection());
    }
    //TODO: GET list of items.
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
                totalCount={this.state.totalCount}
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
    const path = '/collection/' + this.props.username;
    const url = base + ':' + port + path;
    console.debug('GET filtered collection for',this.props.username);
    axios.get(url, {
      params: {
        "mechanicalPencils": this.state.mechanicalPencils,
        "fountainPens" : this.state.fountainPens,
        "cartridgePens" : this.state.cartridgePens,
        "woodPencils" : this.state.woodPencils,
        "lead" : this.state.lead,
        "replacements" : this.state.replacements,
        "ink" : this.state.ink,
        "penCartridge" : this.state.penCartridge,
        "utility" : this.state.utility,
      }
    })
    .then(response => this.setState({
      items: response.data
    }));

    this.loadCount();
  }

  loadCount() {
    const path = '/collection/' + this.props.username + '/totalCount';
    const url = base + ':' + port + path;
    console.debug('GET total count for collection for',this.props.username);
    axios.get(url, {})
    .then(response => {
      this.setState({
        totalCount: response.data.collectionCount
      });
      console.log(response);
    });
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
    //TODO test.
      const path = '/collection/' + this.props.username + '/item';
      const url = base + ':' + port + path;
      console.debug('DELETE item',this.state.item.basicAtts.itemId,'of type',this.state.item.basicAtts.type);
      return axios.delete(url, {
        params: {
          itemId: this.state.item.basicAtts.itemId,
          type: this.state.item.basicAtts.type
        }
      })
      .then(response => {
        console.log(response);
        this.loadFilteredCollection();
      });

      this.onCloseItem();
  }

  onSaveItem() {

    console.debug('PUT item',this.state.newItem);
    const path = '/gallery';
    const url = base + ':' + port + path;
    return axios.put(url, this.state.newItem)
    .then(response => {
      console.log(response);
      this.loadFilteredCollection();
    });

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

    const path = '/collection/' + this.props.username + '/item';
    const url = base + ':' + port + path;
    console.debug('POST item',this.state.newItem);
    return axios.post(url, this.state.newItem)
    .then(response => {
      console.log(response);
      this.loadFilteredCollection();
    });

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
