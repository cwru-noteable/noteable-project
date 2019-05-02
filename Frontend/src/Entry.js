import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import LoginForm from "./Login";
import RegisterForm from "./Register";
 
class Entry extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Entry</h1>
          <ul className="header">
            <li><NavLink exact to="/entry">Home</NavLink></li>
            <li><NavLink to="/entry/register">Register</NavLink></li>
            <li><NavLink to="/entry/login">Login</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/entry" component={Home}/>
            <Route path="/entry/register" component={RegisterForm}/>
            <Route path="/entry/login" component={LoginForm}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Entry;
