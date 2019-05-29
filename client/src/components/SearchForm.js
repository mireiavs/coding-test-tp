import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchEvents } from "../actions";

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

  // fill state with user input
  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  // on submit, check fields and if they all have content call function to fetch events
  handleSubmit(e) {
    e.preventDefault();
    const { gameId, provider, tpdid } = this.state;
    // check if all fields are filled
    if (gameId === "" || provider === "" || tpdid === "") {
      this.props.getFormError("Please enter all fields.");
    } else {
      this.props.fetchEvents(gameId, provider, tpdid);
      // clear form error
      this.props.getFormError(null);
    }
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

SearchForm.propTypes = {
  fetchEvents: PropTypes.func
};

export default connect(
  null,
  { fetchEvents }
)(SearchForm);
