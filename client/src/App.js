import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = { cards: [] };

  moreCards = () => {
    fetch("/cards")
      .then(res => res.json())
      .then(cards => this.setState({ cards }))
      .catch(e => console.log(e));
  };

  componentDidMount() {
    this.moreCards();
  }

  render() {
    return (
      <div className="App">
        <h1>cards</h1>
        <button onClick={this.moreCards}>more cards</button>
        {this.state.cards.map(card => (
          <div key={card.name}>
            <div>{card.name}</div>
            <a href={card.link} rel="noopener noreferrer" target="_blank">
              more info
            </a>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
