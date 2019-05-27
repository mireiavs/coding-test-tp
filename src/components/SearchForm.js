import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvents } from "../actions/eventActions";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "",
      provider: "",
      tpdid: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { gameId, provider, tpdid } = this.state;
    this.props.fetchEvents(gameId, provider, tpdid);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="search-form">
          <div className="search-inputs">
            <div>
              <label htmlFor="gameId">Game ID:</label>
              <input
                type="text"
                id="gameId"
                value={this.state.gameId}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="provider">Provider:</label>
              <input
                type="text"
                id="provider"
                value={this.state.provider}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <label htmlFor="tpdid">TPD ID:</label>
              <input
                type="text"
                id="tpdid"
                value={this.state.tpdid}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <Button type="submit">Search</Button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchEvents }
)(SearchForm);
