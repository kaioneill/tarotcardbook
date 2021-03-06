import React, { Component } from 'react';
import "../App.css";
import SpreadContainer from "./SpreadContainer";

export class SpreadList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spreads: [],
      loading: true
    };
    this.listSpreads = this.listSpreads.bind(this);
    this.transformCards = this.transformCards.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    this.listSpreads();
  }

  delete = (id) => {
    if (!window.confirm("are you sure you want to remove this day?")) return
    fetch("/spreads/delete/" + id, {
      method: "DELETE"
    })
      .then(data => {
        if (data) {
          console.log("spread deleted");
          this.setState({ spreads: this.state.spreads.filter(spread => spread._id !== id) });
        }
      })
      .catch(e => console.log(e));
  }

  transformCards = (cards, reversals) => {
    let cardData = [];
    cards.forEach((card, i) => {
      cardData.push({ card: card, reversed: reversals[i] });
    });
    return cardData;
  }

  listSpreads = () => {
    fetch("spreads/list")
      .then(res => res.json())
      .then(spreads => {
        this.setState({ spreads: spreads });
        this.setState({ loading: false });
      })
      .catch(e => console.log(e));
  }

  render() {
    if (this.state.loading) {
      return (
        <div className="SpreadList white-back shadow-box">
          <h2>past spreads</h2>
          <div className="spread-container flex flex-center flex-wrap">
            loading...
          </div>
        </div>
      );
    } else {
      return (
        <div className="SpreadList white-back shadow-box">
          <h2>past spreads</h2>
          <div className="spread-container flex flex-center">
            {this.state.spreads.length === 0 ? (
              <div>no spreads yet</div>
            ) : (
              <div className="flex flex-center flex-wrap full-width">
                {this.state.spreads.map((spread) => (
                  <SpreadContainer
                    spread={spread}
                    key={spread._id}
                    transformCards={this.transformCards}
                    initState={false}
                    update={true}
                    listSpreads={this.listSpreads}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }
  }
}

export default SpreadList;
