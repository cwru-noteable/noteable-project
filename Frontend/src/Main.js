import React, { Component } from "react";
import {
  Route,
  HashRouter,
  Switch,
  Redirect,
  withRouter
} from "react-router-dom";
import Hub from "./Hub";
import Entry from "./Entry";
 
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'default',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }

  render() {
    return (
      <HashRouter>
          <div className="content">
            <Switch>
              <Redirect exact from='/' to='/entry'/>
              <Route path='/entry' render={(props) => <Entry handleUsernameChange={this.handleUsernameChange} handleLogin={this.handleLogin} username={this.state.username}/>}/>
            </Switch>
            <Switch>
              <Redirect exact from='/hub' to={'/hub/'+this.state.username}/>
              <Route path={'/hub/:username'} render={(props) => <Hub username={this.state.username}/>}/>
            </Switch>
          </div>
      </HashRouter>
    );
  }

  handleLogin() {
    // this.setState({
    //   username: username,
    // });

    // POST user
    // const base = 'http://172.20.27.214:3002';
    // const path = '/users';
    // return axios.post(base + path, {
    //   username: this.state.username
    // })
    // .then(response => console.log(response));

    withRouter(({ history }) => history.push('/hub'));
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

}
 
export default Main;
