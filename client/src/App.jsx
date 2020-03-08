import React, { Component } from "react";
import "./App.css";
import Spread from "./components/Spread";
import CardList from "./components/CardList";
import SpreadList from "./components/SpreadList";
import Signup from "./components/Signup";
import Login from "./components/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "spread",
      loggedIn: false,
      signup: false
    };
    this.setPage = this.setPage.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.logout = this.logout.bind(this);
    this.toggleSignUp = this.toggleSignUp.bind(this);
    this.toggleDepressed = this.toggleDepressed.bind(this);
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

  setPage = (e, page) => {
    this.setState({ page: page });
    this.toggleDepressed(e);
  };

  toggleDepressed = e => {
    if (e) {
      document.querySelector(".main-select > .depressed").classList.remove("depressed");
      e.target.classList.add("depressed");
    }
  };

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
        <div className="App">
          <button onClick={this.logout}>logout</button>
          <h1>tarot</h1>
          {/* <Signup /> */}
          <div className="main-select ">
            <button
              className="depressed"
              onClick={e => this.setPage(e, "spread")}
            >
              spread
            </button>
            <button className="" onClick={e => this.setPage(e, "card_list")}>
              list
            </button>
            <button className="" onClick={e => this.setPage(e, "spread_list")}>
              spread list
            </button>
          </div>
          {this.state.page === "spread" ? <Spread /> : ""}
          {this.state.page === "card_list" ? <CardList /> : ""}
          {this.state.page === "spread_list" ? <SpreadList /> : ""}
        </div>
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

export default App;
