import React, { Component } from "react";
import "../App.css";
import { withRouter, Link } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
      email: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch("/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.username) {
        this.props.history.push("/login");
        console.log("user created:", res);
      } else {
        console.log("error");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  render() {
    return (
      <div className="Signup flex flex-center vertical">
        <div className="header dark-back">
          <div className="signup">
            <Link to="/login">
              <div className="button light">login</div>
            </Link>
          </div>
        </div>
        <div className="header login dark-back">
          <h1 className="light">tarot garden</h1>
        </div>
        <h2>signup</h2>
        <form
          className="flex flex-center vertical"
          onSubmit={this.handleSubmit}
        >
          <div className="small-pad flex flex-center">
            <label className="flex vertical flex-start">
              email:
              <div>
                <input
                  className="wide-input"
                  type="text"
                  value={this.state.email}
                  onChange={(event) =>
                    this.setState({ email: event.target.value })
                  }
                />
              </div>
            </label>
          </div>
          <div className="small-pad flex flex-center">
            <label className="flex vertical flex-start">
              username:
              <input
                className="wide-input"
                type="text"
                value={this.state.username}
                onChange={(event) =>
                  this.setState({ username: event.target.value })
                }
              />
            </label>
          </div>
          <div className="small-pad flex flex-center">
            <label className="flex vertical flex-start">
              password:
              <input
                className="wide-input"
                type="password"
                value={this.state.password}
                onChange={(event) =>
                  this.setState({ password: event.target.value })
                }
              />
            </label>
          </div>
          <div className="small-pad">
            <button className="button" type="submit">
              submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);