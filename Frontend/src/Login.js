import React, { Component } from "react";
import {
  Link,
  NavLink,
  Route
} from "react-router-dom";

import Hub from "./Hub"

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameChange(event) {
    this.props.handleUsernameChange(event);
  }

  handleLogin() {
    this.props.handleLogin();
  }

  render() {

    return (
      <div>
      <form>
          <div>
          <h1>Username:</h1>

          <input
            type="text"
            name="username"
            value={this.props.username}
            onChange={this.handleUsernameChange}
          />

          <Link to='/hub'><button
            onClick={this.handleLogin}>Log in</button></Link>

          </div>
      </form>
      </div>

    );
  }
}

// ReactDOM.render(
//   <LoginPage />,
//   document.getElementById('root')
// );

export default LoginForm;
