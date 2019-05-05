import React, { Component } from "react";
import axios from 'axios';

class CollectionItemView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newBasicAtts: props.basicAtts
    };

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
          <div class="leftDiv">
            <button onClick={this.onEditItem}>Edit</button>
            <button onClick={this.onDeleteItem}>Delete</button>
          </div>
          <div class='rightDiv'>
            <div class="leftDiv">
              <h1>{this.props.basicAtts.itemName}</h1>
              <h2>ID: {this.props.basicAtts.itemId}</h2>
            </div>
            <div class="rightDiv">
              <button onClick={this.onCloseItem}>Close</button>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (
        <form onSubmit={this.onSaveItem}>
          <div class="leftDiv">
            <input type='submit' value='Save'/>
          </div>
          <div class='rightDiv'>
            <div class="leftDiv">
              <h1>Name:</h1>
              <input
                type='text'
                name={'itemName'}
                value={this.state.newBasicAtts.itemName}
                onChange={this.onInputChangeEvent}/>
              <h2>ID: {this.state.newBasicAtts.itemId}</h2>
              <h2>Manufacturer:</h2>
              <input
                type='text'
                name={'manufacturer'}
                value={this.state.newBasicAtts.manufacturer}
                onChange={this.onInputChangeEvent}/>
            </div>
            <div class="rightDiv">
              <button onClick={this.onCloseItem}>Close</button>
            </div>
          </div>
        </form>
      );
    }

  }

  onCloseItem() {
    this.setState({
      newBasicAtts: this.props.basicAtts
    }, this.props.onCloseItem());

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


    this.setState((prevState) => ({
      ...prevState,
      newBasicAtts: {
        ...prevState.newBasicAtts,
        [name]: value
      }
    }), () => {this.props.onInputChange("item", this.state);});
  }

  onInputChange(name, value) {
    this.state.name = value;
    this.setState({
      [name]: value
    }, () => {this.props.onInputChange("item", this.state);});


  }

}



export default CollectionItemView;
