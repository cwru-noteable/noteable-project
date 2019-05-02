import React, { Component } from "react";
import {
  Route,
  HashRouter,
  Switch,
  Redirect
} from "react-router-dom";
import Hub from "./Hub";
import Entry from "./Entry";
 
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'onebuh',
    };
  }

  render() {
    return (
      <HashRouter>
        <div>
          <div className="content">
            <Switch>
              <Redirect exact from='/' to='/entry'/>
              <Route path='/entry' component={Entry}/>
            </Switch>
            <Route path='/hub' render={(props) => <Hub username={this.state.username}/>}/>
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;
