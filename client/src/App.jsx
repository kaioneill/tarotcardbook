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
              {this.state.loggedIn ? <Tarot /> : <Redirect to="/login" />}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
