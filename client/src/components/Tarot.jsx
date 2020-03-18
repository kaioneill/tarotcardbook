import React, { Component } from "react";
import "../App.css";
import Spread from "./Spread";
import CardList from "./CardList";
import SpreadList from "./SpreadList";
import BuildSpread from "./BuildSpread";
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect, withRouter } from "react-router-dom";



class Tarot extends Component {
  constructor(props) {
    super(props);
    if (!this.props.redirect === '/login') this.props.history.push(`${this.props.redirect}`);
  }

  render() {
    return (
      <Router>
        <div className="Tarot">
          <h1>cardbook</h1>
          <div className="main-select btn-group">
            <NavLink activeClassName="depressed" exact to="/pull_cards">
              <button>pull cards</button>
            </NavLink>
            <NavLink activeClassName="depressed" to="/build_spread">
              <button>build spread</button>
            </NavLink>
            <NavLink activeClassName="depressed" to="/past_spreads">
              <button>past spreads</button>
            </NavLink>
            <NavLink activeClassName="depressed" to="/all_cards">
              <button>all cards</button>
            </NavLink>
          </div>
          <div className="flex flex-center sticky">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/pull_cards" />
              </Route>
              <Route path="/pull_cards" component={Spread} />
              <Route path="/build_spread" component={BuildSpread} />
              <Route path="/past_spreads" component={SpreadList} />
              <Route path="/all_cards" component={CardList} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default withRouter(Tarot);
