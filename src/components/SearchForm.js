import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchEvents } from "../actions/eventActions";

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
      <div className="form-container">
        <span className="form-heading">
          <h1>Search for events</h1>
        </span>
        <form onSubmit={this.handleSubmit} className="search-form">
          <div className="input-group">
            <label htmlFor="gameId">Game ID:</label>
            <input
              type="text"
              id="gameId"
              value={this.state.gameId}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="provider">Provider:</label>
            <input
              type="text"
              id="provider"
              value={this.state.provider}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="tpdid">TPD ID:</label>
            <input
              type="text"
              id="tpdid"
              value={this.state.tpdid}
              onChange={this.handleChange}
            />
          </div>
          <div className="search-btn">
            <button type="submit">Search</button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { fetchEvents }
)(SearchForm);
