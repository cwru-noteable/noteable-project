import React, { Component } from "react";
import axios from 'axios';

import CollectionAddItemContainer from "./CollectionAddItemContainer";

class CollectionAddItemView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      basicAtts: {
        itemName: '',
        manufacturer: '',
        type: 'mechanicalPencil'
      },
      stats: {}
    };


    this.onCancelAddItem = this.onCancelAddItem.bind(this);
    this.onSaveNewItem = this.onSaveNewItem.bind(this);

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChangeEvent = this.onInputChangeEvent.bind(this);
    this.onDropdownChange = this.onDropdownChange.bind(this);
  }


  render() {
    return (
      <div>
        <div className="leftDiv">
          <button onClick={this.onSaveNewItem}>Add</button>
        </div>
        <form>
          <div className='rightDiv'>
            <div className="leftDiv">
              <h2>Name:<input type='text'
                name={'itemName'}
                value={this.state.basicAtts.itemName}
                onChange={this.onInputChangeEvent}/></h2>
              <h3>Manufacturer:<input type='text'
                name={'manufacturer'}
                value={this.state.basicAtts.manufacturer}
                onChange={this.onInputChangeEvent}/></h3>

              <h3>Type:</h3>
              <select value={this.state.basicAtts.type} onChange={this.onDropdownChange}>
                <option value="mechanicalPencil">mechanicalPencil</option>
                <option value="fountainPen">fountainPen</option>
                <option value="cartridgePen">cartridgePen</option>
                <option value="woodPencil">woodPencil</option>
                <option value="lead">lead</option>
                <option value="replacement">replacement</option>
                <option value="ink">ink</option>
                <option value="penCartridge">penCartridge</option>
                <option value="utility">utility</option>
              </select>

              <CollectionAddItemContainer onInputChange={this.onInputChange} type={this.state.basicAtts.type}/>

            </div>
            <div className="rightDiv">
              <button onClick={this.onCancelAddItem}>Cancel</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  onDropdownChange(event) {
    const val = event.target.value;
    this.onInputChange("type", val);
  }

  onCancelAddItem() {
    this.props.onCancelAddItem();
  }

  onSaveNewItem() {
    this.props.onSaveNewItem();
  }



  onInputChange(name, value) {

    if (name === "itemName" || name === "manufacturer" || name === "type") {
      this.setState((prevState) => ({
        ...prevState,
          basicAtts: {
            ...prevState.basicAtts,
            [name]: value
          }
      }), () => {this.props.onInputChange("newItem", this.state);});
    }
    else {
      this.setState({
        [name]: value
      }, () => {this.props.onInputChange("newItem", this.state);});
    }
  }

  onInputChangeEvent(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.onInputChange(name, value);
  }

}



export default CollectionAddItemView;
