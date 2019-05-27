import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchForm from "../components/SearchForm";

const EventList = props => {
  let eventList = "";
  if (props.events) {
    let events = props.events.data;
    eventList = events.map(event => {
      let recordArray = Object.entries(event.record);
      let record = recordArray.map(recordEntry => {
        return (
          <div key={recordEntry[0]}>
            {recordEntry[0]}: {recordEntry[1]}
          </div>
        );
      });
      return (
        <div className="single-event" key={event.id}>
          <h4>
            Event name:{" "}
            {event.record.event_name ||
              event.record.evtname ||
              event.record.state_name}{" "}
          </h4>
          <div>{record}</div>
        </div>
      );
    });
  }
  return (
    <div className="main">
      <h1>Search for events</h1>
      <SearchForm />
      <div className="event-list">{eventList}</div>
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.object
};

const mapStateToProps = state => ({
  events: state.events
});

export default connect(mapStateToProps)(EventList);
