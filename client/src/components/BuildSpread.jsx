import React, { Component } from "react";
import "../App.css";
import BuildCard from "./BuildCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

class BuildSpread extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.spreadId || null,
      whichCards: this.props.cardData
        ? this.props.cardData.map((obj, i) => {
            obj.which = `card${i + 1}`;
            return obj;
          })
        : [],
      cardData: this.props.cardData || [],
      enoughCards: this.props.update ? true : false,
      notes: this.props.notes || "",
      date: this.props.date || new Date(),
      update: this.props.update || false,
      saved: false,
      spread: this.props.spread || {}
    };
    this.saveSpread = this.saveSpread.bind(this);
    this.transformCards = this.transformCards.bind(this);
    this.addCard = this.addCard.bind(this);
    this.updateCardData = this.updateCardData.bind(this);
  }


  addCard = (card, which, reversed) => {
    let whichCards = this.state.whichCards.filter(obj => obj.which !== which);
    whichCards.push({ which: which, card: card, reversed: reversed });
    whichCards = whichCards.sort((a, b) => a.which.localeCompare(b.which));
    this.setState({ whichCards: whichCards }, () => {
      console.log(this.state.whichCards);
      if (this.state.whichCards.length === 3) {
        this.updateCardData();
        this.setState({ enoughCards: true });
      } else {
        this.setState({ enoughCards: false });
      }
    });
  };

  removeCard = which => {
    let whichCards = this.state.whichCards.filter(obj => obj.which !== which);
    this.setState({ whichCards: whichCards }, () => {
      console.log(this.state.whichCards);
      if (this.state.whichCards.length === 3) {
        this.updateCardData();
        this.setState({ enoughCards: true });
      } else {
        this.setState({ enoughCards: false });
      }
    });
  };

  transformCards = cards => {
    let cardData = [];
    cards.forEach(card => {
      cardData.push({ card: card, reversed: Math.random() >= 0.5 });
    });
    return cardData;
  };

  updateCardData = () => {
    let cardData = [];
    this.state.whichCards.forEach(obj => {
      cardData.push({ card: obj.card, reversed: obj.reversed });
    });
    this.setState({ cardData: cardData });
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
          this.setState({ spread: data }, () => {
            if (this.props.toggleEdit) {
              this.props.toggleEdit({
                _id: this.state.id,
                _cards: this.state.cardData.map(cardData => cardData.card),
                reversals: this.state.cardData.map(cardData => cardData.reversed),
                notes: this.state.notes,
                date: this.state.date
              });
            }
          });
          
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
          // this.setState({
          //   spreads: this.state.spreads.filter(spread => spread._id !== id)
          // });
          this.props.listSpreads();
        }
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div className="BuildSpread shadow-box">
        {!this.state.update ? (
          <h2>build spread</h2>
        ) : (
          <h3>{moment(this.state.date).format("MMMM D, YYYY")}</h3>
        )}
        <div className="flex vertical">
          <div className="btn-group">
            {this.state.update ? (
              <div className="button" onClick={() => this.deleteSpread(this.state.id)}>
                remove
              </div>
            ) : (
              ""
            )}
            <div className="button"
              onClick={this.saveSpread}
              disabled={
                this.state.enoughCards && !this.state.saved ? false : true
              }
            >
              {this.state.update ? "save changes" : "save spread"}
            </div>
          </div>
          <div className="pad">
            <DatePicker
              showPopperArrow={false}
              selected={this.state.date}
              onChange={date => this.setState({ date: date })}
            />
          </div>
          <div>
            <textarea
              className="spread-notes"
              placeholder="write notes here"
              onChange={event => this.setState({ notes: event.target.value })}
              value={this.state.notes}
            ></textarea>
          </div>
        </div>
        <div className="card-container flex flex-center flex-wrap">
          <BuildCard
            index="card1"
            addCard={this.addCard}
            removeCard={this.removeCard}
            card={this.state.cardData[0] ? this.state.cardData[0].card : ""}
            reversed={
              this.state.cardData[0] ? this.state.cardData[0].reversed : ""
            }
          />
          <BuildCard
            index="card2"
            addCard={this.addCard}
            removeCard={this.removeCard}
            card={this.state.cardData[1] ? this.state.cardData[1].card : ""}
            reversed={
              this.state.cardData[1] ? this.state.cardData[1].reversed : ""
            }
          />
          <BuildCard
            index="card3"
            addCard={this.addCard}
            removeCard={this.removeCard}
            card={this.state.cardData[2] ? this.state.cardData[2].card : ""}
            reversed={
              this.state.cardData[2] ? this.state.cardData[2].reversed : ""
            }
          />
        </div>
      </div>
    );
  }
}

export default BuildSpread;
