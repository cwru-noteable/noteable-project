import React, { Component } from "react";

import GalleryList from './GalleryList';

class Gallery extends Component {
  constructor(props) {
    this.state = {
      items: [],
    };

    this.onViewItem = this.onViewItem.bind(this);
  }

  render() {
    return (
      <div>
        <h1>Gallery</h1>
        <p>Look at all these wonderful items everyone has (ooh.)</p>
        <GalleryList
          onViewItem={this.onViewItem}
          username={this.props.username}
          items={this.state.items}
        />
      </div>
    );
  }

  onViewItem() {
    //TODO
  }
}

export default Gallery;
