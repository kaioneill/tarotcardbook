import React, { Component } from "react";
import "../App.css";
import Dashboard from "./Dashboard";
import Spread from "./Spread";
import CardList from "./CardList";
import SpreadList from "./SpreadList";
import BuildSpread from "./BuildSpread";
import { BrowserRouter as Router, Switch, Route, NavLink, Redirect, withRouter } from "react-router-dom";



class Tarot extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.redirect);
    // if (this.props.redirect !== '/login') this.props.history.push(`${this.props.redirect}`);
    if (localStorage.redirect) this.props.history.push(`${localStorage.redirect}`);
  }

  render() {
    return (
      <Router>
        <div className="Tarot">
          <div className="header dark-back">
            <NavLink className="dull" exact to="/dashboard">
              <h1 className="light">tarot garden</h1>
            </NavLink>
            <div className="main-select btn-group">
              <NavLink
                className="button light"
                activeClassName="depressed"
                exact
                to="/dashboard"
              >
                dashboard
              </NavLink>
              <NavLink
                className="button light"
                activeClassName="depressed"
                exact
                to="/pull_cards"
              >
                pull cards
              </NavLink>
              <NavLink
                className="button light"
                activeClassName="depressed"
                to="/build_spread"
              >
                build spread
              </NavLink>
              <NavLink
                className="button light"
                activeClassName="depressed"
                to="/past_spreads"
              >
                past spreads
              </NavLink>
              <NavLink
                className="button light"
                activeClassName="depressed"
                to="/all_cards"
              >
                all cards
              </NavLink>
            </div>
          </div>
          <div className="flex flex-center sticky">
            <Switch>
              <Route path="/" exact>
                <Redirect to="/dashboard" />
              </Route>
              <Route path="/dashboard" component={Dashboard} />
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
