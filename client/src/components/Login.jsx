import React, { Component } from "react";
import "../App.css";
import { Link, withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    console.log("login username: " + this.state.username);
    event.preventDefault();
    fetch("/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'include',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        console.log("data.username present")
        this.props.updateUser({
          loggedIn: true
        });
        if (this.props.location.state) {
          this.props.history.push(`${this.props.location.state.path}`);
        }
      }
      console.log("Success:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  render() {
    return (
      <div className="flex flex-center vertical">
        <div className="header dark-back">
          <div className="signup">
            <Link to="/signup">
              <div className="button light">signup</div>
            </Link>
          </div>
        </div>
        <div className="header login dark-back">
          <h1 className="light">tarot garden</h1>
        </div>
        <h2>login</h2>
        <form
          className="flex flex-center vertical"
          onSubmit={this.handleSubmit}
        >
          <label>
            username:
            <input
              type="text"
              value={this.state.username}
              onChange={(event) =>
                this.setState({ username: event.target.value })
              }
            />
          </label>
          <label>
            password:
            <input
              type="password"
              value={this.state.password}
              onChange={(event) =>
                this.setState({ password: event.target.value })
              }
            />
          </label>
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

export default withRouter(Login);