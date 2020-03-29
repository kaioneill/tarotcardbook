import React, { Component } from "react";
import "./App.css";
import Tarot from "./components/Tarot";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    localStorage.setItem("redirect", window.location.pathname);
    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (localStorage.auth) {
      this.setState({ loggedIn: true });  
    } else {
      fetch("/users", { credentials: "include" })
        .then(res => res.json())
        .then(res => {
          if (res.user) {
            this.setState({ loggedIn: true });
            localStorage.setItem("auth", "true");
            console.log(`${res.user.username} logged in`);
          } else {
            localStorage.removeItem("auth");
          }
        })
        .catch(e => console.log(e));
      }
  }

  updateUser = data => {
    console.log(`updateUser ${data.loggedIn}`);
    this.setState({ loggedIn: data.loggedIn });
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
        localStorage.removeItem("auth");
        console.log("logged out");
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <div className="top-bar flex flex-center">
            {this.state.loggedIn ? (
              <div className="logout">
                <div className="button" onClick={this.logout}>logout</div>
              </div>
            ) : (
              ""
            )}
          </div>
          <Switch>
            <Route path="/signup" component={Signup} />
            <Route path="/login">
              {this.state.loggedIn ? (
                <Redirect to="/" />
              ) : (
                <Login updateUser={this.updateUser} />
              )}
            </Route>
            {/* <Route path="/:path" render={({match}) => 
              this.state.loggedIn ? <Tarot redirect={match.params.path} /> : <Redirect to={{ pathname: "/login", state: { path: match.params.path } }} />
            } /> */}
            <Route path="/">
              {this.state.loggedIn ? (
                <Tarot redirect="/" />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
          </Switch>
        </div>
        <div className="footer">
          <div>kai o'neill 2020</div>
        </div>
      </Router>
    );
  }
}

export default App;
