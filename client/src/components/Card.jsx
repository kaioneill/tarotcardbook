import React, { Component } from "react";
import "../App.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reversed: Math.random() >= 0.5
    };
  }

  render() {
    return (
      <div className="Card">
        <img
          src={"/images/cards/" + this.props.card.img}
          alt={this.props.card.name + ".img"}
          onClick={this.showModal}
          className={"card-image" + (this.state.reversed ? " rotate-180" : "")}
        ></img>
        <h4>
          {this.props.card.name + (this.state.reversed ? " Reversed" : "")}
        </h4>
        <div>"{this.props.card.light[0]}"</div>
        <a
          href={this.props.card.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          more info
        </a>
      </div>
    );
  }
}

export default Card;
