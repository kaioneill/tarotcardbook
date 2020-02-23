import React, { Component } from "react";
import "../App.css";

class Card extends Component {
  showModal = () => {
    
  };

  render() {
    return (
      <div className="Card">
        <img
          src={"/images/cards/" + this.props.card.img}
          alt={this.props.card.name + ".img"}
          onClick={this.showModal}
          className="card-image"
        ></img>
        <div>{this.props.card.name}</div>
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
