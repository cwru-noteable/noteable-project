import React, { Component } from "react";
import axios from 'axios';

class CollectionFilter extends Component {
  constructor(props) {
    super(props);

    this.onFilterInputChange = this.onFilterInputChange.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Filter</h1>
        <form>
          <h2>Implements</h2>
          <h3>Mechanical Pencils</h3>
          <input type='checkbox'
            name={'mechanicalPencils'}
            checked={this.props.mechanicalPencils}
            onChange={this.onFilterInputChange}/>

          <h3>Fountain Pens</h3>
          <input type='checkbox'
            name={'fountainPens'}
            checked={this.props.fountainPens}
            onChange={this.onFilterInputChange}/>

          <h3>Cartidge Pens</h3>
          <input type='checkbox'
            name={'cartridgePens'}
            checked={this.props.cartridgePens}
            onChange={this.onFilterInputChange}/>

          <h3>Wood Pencils</h3>
          <input type='checkbox'
            name={'woodPencils'}
            checked={this.props.woodPencils}
            onChange={this.onFilterInputChange}/>

          <h2>Other</h2>
          <h3>Lead</h3>
          <input type='checkbox'
            name={'lead'}
            checked={this.props.lead}
            onChange={this.onFilterInputChange}/>

          <h3>Replacements</h3>
          <input type='checkbox'
            name={'replacements'}
            checked={this.props.replacements}
            onChange={this.onFilterInputChange}/>

          <h3>Ink</h3>
          <input type='checkbox'
            name={'ink'}
            checked={this.props.ink}
            onChange={this.onFilterInputChange}/>

          <h3>Pen Cartridge</h3>
          <input type='checkbox'
            name={'penCartridge'}
            checked={this.props.penCartridge}
            onChange={this.onFilterInputChange}/>

          <h3>Utility</h3>
          <input type='checkbox'
            name={'utility'}
            checked={this.props.utility}
            onChange={this.onFilterInputChange}/>
        </form>

      </div>
    );
  }

  onFilterInputChange(event) {
    this.props.onFilterInputChange(event.target.name, event.target.checked);
  }
}



export default CollectionFilter;
