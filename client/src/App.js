import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = { cards: [] };

  componentDidMount() {
    fetch("/cards")
      .then(res => res.json())
      .then(cards => this.setState({ cards }))
      .catch((e) => console.log(e));
  }

  render() {
    return (
      <div className="App">
        <h1>Cards</h1>
        {this.state.cards.map(card => (
          <div key={card.name}>
            <div>{card.name}</div>
            <a href={card.link} rel="noopener noreferrer" target="_blank">
              More info
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
