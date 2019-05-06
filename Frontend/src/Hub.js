import React, { Component } from "react";
import {
  Route,
  NavLink,
  Link,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import Collection from "./Collection/Collection";
import Gallery from "./Gallery";
 
class Hub extends Component {

  render() {
    return (
      <HashRouter>
        <div>
          <h1>Hub</h1>
          <ul className="header">
            <li><NavLink exact to={"/hub/"+this.props.username}>Home</NavLink></li>
            <li><NavLink to={'/hub/'+this.props.username+'/collections'}>My Collection</NavLink></li>
            <li><NavLink to={'/hub/'+this.props.username+'/gallery'}>Gallery</NavLink></li>
            <li><Link to="/entry">Log Out</Link></li>
          </ul>
          <div className="content">
            <Route exact path={'/hub/:username'} render={(props) => <Home username={this.props.username}/>}/>
            <Route path={'/hub/:username/collections'} render={(props) => <Collection username={this.props.username}/>}/>
            <Route path={'/hub/:username/gallery'} component={Gallery}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Hub;
