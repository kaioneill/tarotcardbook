import React, { Component } from "react";
import "./App.css";
import Spread from "./components/Spread";
import List from "./components/List";
import Signup from "./components/Signup";
import Login from "./components/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpread: true,
      loggedIn: false,
      signup: false
    };
    this.toggleSpread = this.toggleSpread.bind(this);
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

  toggleSpread = () => {
    this.setState({ showSpread: !this.state.showSpread });
  };

  updateUser = (user) => {
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
        <div className="App">
          <button onClick={this.logout}>logout</button>
          <h1>tarot</h1>
          {/* <Signup /> */}
          <button onClick={this.toggleSpread}>
            show {this.state.showSpread ? "list" : "spread"}
          </button>
          {this.state.showSpread ? <Spread /> : <List />}
        </div>
      );
    } else {
      return (
        <div className="App">
          <button onClick={this.toggleSignUp}>{this.state.signup ? 'login' : 'signup'}</button>
          <h1>tarot</h1>
          {this.state.signup ? <Signup /> : <Login updateUser={this.updateUser} />}
        </div>
      );
    }
  }
}

export default App;
