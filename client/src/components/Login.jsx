import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (event) => {
    console.log("login username: " + this.state.username);

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
        })
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
        <Link to="/signup">
          <button>
            signup
          </button>
        </Link>
        <h2>login</h2>
        <label>
          username:
          <input
            type="text"
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
          />
        </label>
        <label>
          password:
          <input
            type="password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
          />
        </label>
        <div>
          <input onClick={this.handleSubmit} type="button" value="submit" />
        </div>
      </div>
    );
  }
}

export default Login;