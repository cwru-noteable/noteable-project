import React, { Component } from "react";
import axios from 'axios';

class CollectionFilter extends Component {
  constructor(props) {
    super(props);

    this.onFilter = this.onFilter.bind(this);
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
            value={this.props.mechanicalPencils}
            onChange={this.onFilterInputChange}/>

          <h3>Fountain Pens</h3>
          <input type='checkbox'
            name={'fountainPens'}
            value={this.props.fountainPens}
            onChange={this.onFilterInputChange}/>

          <h3>Cartidge Pens</h3>
          <input type='checkbox'
            name={'cartridgePens'}
            value={this.props.cartridgePens}
            onChange={this.onFilterInputChange}/>

          <h3>Wood Pencils</h3>
          <input type='checkbox'
            name={'woodPencils'}
            value={this.props.woodPencils}
            onChange={this.onFilterInputChange}/>

          <h2>Other</h2>
          <h3>Lead</h3>
          <input type='checkbox'
            name={'lead'}
            value={this.props.lead}
            onChange={this.onFilterInputChange}/>

          <h3>Replacements</h3>
          <input type='checkbox'
            name={'replacements'}
            value={this.props.replacements}
            onChange={this.onFilterInputChange}/>

          <h3>Ink</h3>
          <input type='checkbox'
            name={'ink'}
            value={this.props.ink}
            onChange={this.onFilterInputChange}/>

          <h3>Pen Cartidge</h3>
          <input type='checkbox'
            name={'penCartridge'}
            value={this.props.penCartridge}
            onChange={this.onFilterInputChange}/>

          <h3>Utility</h3>
          <input type='checkbox'
            name={'utility'}
            value={this.props.utility}
            onChange={this.onFilterInputChange}/>



        </form>
        <button onClick={this.onFilter}>Refresh</button>

      </div>
    );
  }

  onFilter() {
    // TODO is submit even needed???
  }

  onFilterInputChange(event) {
    this.props.onFilterInputChange(event.target.name, event.target.value);
  }
}



export default CollectionFilter;
