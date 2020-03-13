import React, { Component } from "react";
import "../App.css";
import Spread from "./Spread";
import CardList from "./CardList";
import SpreadList from "./SpreadList";
import Signup from "./Signup";
import Login from "./Login";
import BuildSpread from "./BuildSpread";
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";



class Tarot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "pull_cards",
      loggedIn: false,
      signup: false
    };
    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
  }

  componentDidMount() {
    fetch("/users", { credentials: "include" })
      .then(res => res.json())
      .then(res => {
        if (res.user) {
          this.setState({ loggedIn: true });
        }
      })
      .catch(e => console.log(e));
  }

  updateUser = user => {
    console.log(`updateUser ${user.loggedIn}`);
    this.setState({ loggedIn: user.loggedIn });
  };

  logout = () => {
    fetch("/users/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          loggedIn: false
        });
        console.log("logged out");
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  toggleSignUp = () => {
    this.setState({ signup: !this.state.signup });
  };

  render() {
    if (this.state.loggedIn) {
      return (
        <Router>
          <div className="Tarot">
            <button onClick={this.logout}>logout</button>
            <h1>tarot</h1>
            {/* <Signup /> */}
            <div className="main-select ">
              <NavLink activeClassName="depressed" exact to="/">
                <button>
                  pull cards
                </button>
              </NavLink>
              <NavLink activeClassName="depressed" to="/build_spread">
                <button>
                  build spread
                </button>
              </NavLink>
              <NavLink activeClassName="depressed" to="/past_spreads">
                <button>
                  past spreads
                </button>
              </NavLink>
              <NavLink activeClassName="depressed" to="/all_cards">
                <button>
                  all cards
                </button>
              </NavLink>
            </div>
            <Switch>
              <Route path="/" exact component={Spread} />
              <Route path="/build_spread" component={BuildSpread} />
              <Route path="/past_spreads" component={SpreadList} />
              <Route path="/all_cards" component={CardList} />
            </Switch>
          </div>
        </Router>
      );
    } else {
      return (
        <div className="App">
          <button onClick={this.toggleSignUp}>
            {this.state.signup ? "login" : "signup"}
          </button>
          <h1>tarot</h1>
          {this.state.signup ? (
            <Signup />
          ) : (
            <Login updateUser={this.updateUser} />
          )}
        </div>
      );
    }
  }
}

export default Tarot;
