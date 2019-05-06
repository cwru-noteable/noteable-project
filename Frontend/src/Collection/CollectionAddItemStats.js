import React, { Component } from "react";
import axios from 'axios';

class CollectionAddItemStats extends Component {
  constructor(props) {
    super(props);

    this.onInputChangeEvent = this.onInputChangeEvent.bind(this);
  }


  render() {
    return (
        <div>
        </div>
    );
  }

  onInputChangeEvent(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => {this.onInputChange('stats', this.state);});

  }

  onInputChange(name, value) {
    this.props.onInputChange(name, value);
  }


}



export default CollectionAddItemStats;
