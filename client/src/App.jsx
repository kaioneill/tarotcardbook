import React, { Component } from "react";
import "./App.css";
import Spread from "./components/Spread"

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>tarot</h1>
        <Spread />
      </div>
    );
  }
}

export default App;
