import React, { Component } from "react";
import "../App.css";
import Card from "./Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class Spread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.spreadId || null,
      cardData: this.props.cardData || [],
      saved: false,
      initState: this.props.initState || true,
      notes: this.props.notes || "",
      date: this.props.date || new Date(),
      update: this.props.update || false
    };
    this.moreCards = this.moreCards.bind(this);
    this.saveSpread = this.saveSpread.bind(this);
    this.transformCards = this.transformCards.bind(this);
    this.deleteSpread = this.deleteSpread.bind(this);
  }

  componentDidMount() {
    // this.moreCards();
  }

  transformCards = cards => {
    let cardData = [];
    cards.forEach(card => {
      cardData.push({ card: card, reversed: Math.random() >= 0.5 });
    });
    return cardData;
  };

  moreCards = () => {
    this.setState({ cardData: [], initState: false, saved: false });
    fetch("spreads/cards")
      .then(res => res.json())
      .then(cards => this.setState({ cardData: this.transformCards(cards) }))
      .catch(e => console.log(e));
  };

  saveSpread = () => {
    fetch("/spreads/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        id: this.state.id,
        cards: this.state.cardData.map(cardData => cardData.card),
        reversals: this.state.cardData.map(cardData => cardData.reversed),
        notes: this.state.notes,
        date: this.state.date
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          console.log("spread saved");
          if (!this.state.update) {
            this.setState({ saved: true });
          }
          this.setState({ spread: data })
        }
      })
      .catch(e => console.log(e));
  };

  deleteSpread = id => {
    if (!window.confirm("are you sure you want to remove this day?")) return;
    fetch("/spreads/delete/" + id, {
      method: "DELETE"
    })
      .then(data => {
        if (data) {
          console.log("spread deleted");
          this.setState({
            spreads: this.state.spreads.filter(spread => spread._id !== id)
          });
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    if (this.state.cardData.length === 0) {
      return (
        <div className="Spread">
          <h2>pull cards</h2>
          <button onClick={this.moreCards}>
            {this.state.initState ? "draw cards" : "more cards"}
          </button>
          <button onClick={this.saveSpread} disabled={true}>
            save spread
          </button>
          <div className="card-container flex flex-center flex-wrap pad">
            {this.state.initState
              ? "set your intention and click 'draw cards'"
              : "loading..."}
          </div>
        </div>
      );
    } else {
      return (
        <div className="Spread">
          {!this.state.update ? (
            <h2>pull cards</h2>
          ) : (
            <h3>{moment(this.state.date).format("MMMM D, YYYY")}</h3>
          )}
          <div className="flex vertical">
            <div>
              {!this.state.update ? (
                <button onClick={this.moreCards}>more cards</button>
              ) : (
                <button onClick={() => this.deleteSpread(this.state.id)}>
                  remove
                </button>
              )}
              <button
                onClick={this.saveSpread}
                disabled={this.state.saved ? true : false}
              >
                {this.state.update ? "save changes" : "save spread"}
              </button>
            </div>
            <div className="pad">
              <DatePicker
                selected={this.state.date}
                onChange={date => this.setState({ date: date })}
              />
            </div>
            <div>
              <textarea
                className="spread-notes"
                placeholder="write notes here"
                value={this.state.notes}
                onChange={event => this.setState({ notes: event.target.value })}
              ></textarea>
            </div>
          </div>
          <div className="card-container flex flex-center flex-wrap">
            {this.state.cardData.map(cardData => (
              <Card
                card={cardData.card}
                key={cardData.card.name}
                reversed={cardData.reversed}
              />
            ))}
          </div>
        </div>
      );
    }
  }
}

export default Spread;
