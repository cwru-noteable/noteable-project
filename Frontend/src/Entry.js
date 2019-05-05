import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Home";
import LoginForm from "./Login";
 
class Entry extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  render() {
    return (
      <HashRouter>
        <div>
          <h1>Entry</h1>
          <ul className="header">
            <li><NavLink exact to="/entry">Home</NavLink></li>
            <li><NavLink to="/entry/login">Login</NavLink></li>
          </ul>
          <div className="content">
            <Route exact path="/entry" component={Home}/>
            <Route path="/entry/login" render={(props)=>(<LoginForm handleUsernameChange={this.handleUsernameChange} handleLogin={this.handleLogin} username={this.props.username}/>)}/>
          </div>
        </div>
      </HashRouter>
    );
  }

  handleLogin() {
    this.props.handleLogin();
  }

  handleUsernameChange(event) {
    this.props.handleUsernameChange(event);
  }
}
 
export default Entry;
