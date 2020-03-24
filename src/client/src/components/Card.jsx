import React, { Component } from "react";
import "../App.css";

class Card extends Component {

  render() {
    return (
      <div className="Card">
        <img
          src={"/images/cards/" + this.props.card.img}
          alt={this.props.card.name + ".img"}
          onClick={this.showModal}
          className={"card-image" + (this.props.reversed ? " rotate-180" : "")}
        ></img>
        <h4>
          {this.props.card.name + (this.props.reversed ? " Reversed" : "")}
        </h4>
        <div>{this.props.reversed ? this.props.card.quote_r : this.props.card.quote}</div>
        <a
          href={this.props.reversed ? this.props.card.link_r : this.props.card.link}
          rel="noopener noreferrer"
          target="_blank"
          className="more-info"
        >
          more info
        </a>
      </div>
    );
  }
}

export default Card;
