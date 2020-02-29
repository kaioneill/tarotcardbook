import React, { Component } from "react";
import "./App.css";
import Spread from "./components/Spread";
import List from "./components/List"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSpread: true
    };
    this.toggleSpread = this.toggleSpread.bind(this);
  }

  toggleSpread = () => {
    this.setState({showSpread: !this.state.showSpread});
  }

  render() {
    return (
      <div className="App">
        <h1>tarot</h1>
        <button onClick={this.toggleSpread}>show {this.state.showSpread ? 'list' : 'spread'}</button>
        {this.state.showSpread ? <Spread /> : <List />}
      </div>
    );
  }
}

export default App;
