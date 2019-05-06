import React, { Component } from "react";
import axios from "axios"

import GalleryList from './GalleryList';
import GalleryFilter from './GalleryFilter';

const port = '3002';
const base = 'http://localhost';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

    this.onViewItem = this.onViewItem.bind(this);
    this.loadFilteredCollection = this.loadFilteredCollection.bind(this);
    this.onFilterInputChange = this.onFilterInputChange.bind(this);

  }

  render() {
    return (
      <div className='container'>
        <h1>Gallery</h1>
        <p>Look at all these wonderful items everyone has (ooh.)</p>
        <div className='collectionViewDiv'>
          <div className='leftDiv'>
            <GalleryFilter
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
          <div className='rightDiv'>
            <div className='leftDiv'>
              <GalleryList
                onViewItem={this.onViewItem}
                username={this.props.username}
                items={this.state.items}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  loadFilteredCollection() {
    const path = '/gallery';
    const url = base + ':' + port + path;
    console.debug('GET filtered collection for',this.props.username);
    return axios.get(url, {
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
  }

  onFilterInputChange(name, value) {
    this.setState({
      [name]: value
    }, () => {this.loadFilteredCollection()});
  }

  onViewItem() {
    //TODO
  }
}

export default Gallery;
