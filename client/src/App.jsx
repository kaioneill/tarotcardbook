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
      loggedIn: false,
      redirect: window.location.pathname || "/"
    };
    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    fetch("/users", { credentials: "include" })
      .then(res => res.json())
      .then(res => {
        if (res.user) {
          this.setState({ loggedIn: true });
          console.log(`${res.user.username} logged in`)
        }
      })
      .catch(e => console.log(e));
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
          {this.state.loggedIn ? <button onClick={this.logout}>logout</button> : ''}
          <Switch>
            
            <Route path="/signup" component={Signup} />
            <Route path="/login">
              {this.state.loggedIn ? <Redirect to="/" /> : <Login updateUser={this.updateUser} />}
            </Route>
            <Route path="/">
              {this.state.loggedIn ? <Tarot redirect={this.state.redirect} /> : <Redirect to={{ pathname: "/login", state: { path: this.state.redirect } }} />}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
