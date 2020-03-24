import React, { Component } from "react";
import "../App.css";
import Spread from "./Spread";
import BuildSpread from "./BuildSpread";

class SpreadContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spread: this.props.spread || {},
      edit: false
    };
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  toggleEdit = (spread) => {
    this.setState({ spread: spread }, () => {
      this.setState({ edit: !this.state.edit });
    });
  }

  render() {
    return this.state.edit ? (
      <BuildSpread
        spread={this.state.spread}
        spreadId={this.state.spread._id}
        cardData={this.props.transformCards(
          this.state.spread._cards,
          this.state.spread.reversals
        )}
        initState={this.props.initState}
        notes={this.state.spread.notes}
        date={new Date(this.state.spread.date)}
        update={this.props.update}
        listSpreads={this.props.listSpreads}
        toggleEdit={this.toggleEdit}
      />
    ) : (
      <Spread
        spread={this.state.spread}
        spreadId={this.state.spread._id}
        cardData={this.props.transformCards(
          this.state.spread._cards,
          this.state.spread.reversals
        )}
        initState={this.props.initState}
        notes={this.state.spread.notes}
        date={new Date(this.state.spread.date)}
        update={this.props.update}
        listSpreads={this.props.listSpreads}
        toggleEdit={this.toggleEdit}
      />
    );
  }
}

export default SpreadContainer;
