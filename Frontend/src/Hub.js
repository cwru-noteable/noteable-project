import React, { Component } from "react";
import {
  Route,
  NavLink,
  Link,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Collection from "./Collection";
import Gallery from "./Gallery";
 
class Hub extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.username);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <h1>Hub</h1>
          <ul className="header">
            <li><NavLink exact to="/hub">Home</NavLink></li>
            <li><NavLink to={'/hub/collections/'+this.props.username}>My Collection</NavLink></li>
            <li><NavLink to="/hub/gallery">Gallery</NavLink></li>
            <li><Link to="/entry">Log Out</Link></li>
          </ul>
          <div className="content">
            <Route exact path="/hub" render={(props) => <Home username={this.props.username}/>}/>
            <Route path={'/hub/collections/'+this.props.username} render={(props) => <Collection username={this.props.username}/>}/>
            <Route path="/hub/gallery" component={Gallery}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Hub;
