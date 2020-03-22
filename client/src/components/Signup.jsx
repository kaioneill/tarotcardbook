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
      <div className="flex flex-center vertical">
        <Link to="/login">
          <div className="button">
            login
          </div>
        </Link>
        <h2>signup</h2>
        <form className="flex flex-center vertical" onSubmit={this.handleSubmit}>
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
          <div className="small-pad">
            <button className="button" type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);