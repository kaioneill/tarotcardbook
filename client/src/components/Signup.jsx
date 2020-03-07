import React, { Component } from "react";
import "../App.css";

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
    console.log("signpup username: " + this.state.username);

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
    .then(data => {
      console.log("Success:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="flex flex-center vertical">
        <h2>signup</h2>
        <label>
          email:
          <input
            type="text"
            value={this.state.email}
            onChange={event => this.setState({ email: event.target.value })}
          />
        </label>
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
          <input type="submit" value="Submit" />
        </div>
      </form>
    );
  }
}

export default Signup;