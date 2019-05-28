import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import SearchForm from "../components/SearchForm";
import Loader from "../components/Loader";

const EventList = props => {
  let eventList = "";
  if (props.events) {
    // make a copy of array and sort by 'createdAt' field
    let events = props.events.data.slice(0);
    let sortedEvents = events.sort((a, b) =>
      a.createdAt > b.createdAt ? 1 : -1
    );

    // create event list
    eventList = sortedEvents.map(event => {
      // create a list of 'record' properties
      const recordArray = Object.entries(event.record);
      const record = recordArray.map(recordEntry => {
        // if event is not verified search for invalid fields and give them a different class
        let propertyClass = "";
        let invalidReason = "";
        if (!event.verified) {
          event.invalidFields.forEach(invalidField => {
            if (invalidField.fieldName === recordEntry[0]) {
              propertyClass = "invalid-field";
              invalidReason = `- INVALID FIELD. Reason: ${invalidField.reason}`;
            }
          });
        }
        return (
          <li key={recordEntry[0]} className={propertyClass}>
            {recordEntry[0]}: {recordEntry[1]} {invalidReason}
          </li>
        );
      });

      // if event is not verified, add class 'not-verified'
      let eventClass = "single-event";
      let verifiedText = "";
      if (!event.verified) {
        eventClass += " not-verified";
        verifiedText = "- NOT VERIFIED";
      }

      return (
        <div className={eventClass} key={event.id}>
          <h4>
            {event.record.event_name ||
              event.record.evtname ||
              event.record.state_name}{" "}
            {verifiedText}
          </h4>
          <p>
            Creation date:{" "}
            {moment(event.createdAt).format("MM-DD-YYYY [at] HH:mm")}{" "}
          </p>
          <ul>{record}</ul>
        </div>
      );
    });
  }

  let view = "";

  if (props.loading) {
    view = <Loader />;
  } else if (props.error) {
    view = <p className="message">ERROR: {props.error}</p>;
  } else if (props.events) {
    if (props.events.count !== 0) {
      view = <div className="event-list">{eventList}</div>;
    } else {
      view = (
        <p className="message">There are no events that meet these criteria.</p>
      );
    }
  }

  return (
    <div className="main">
      <SearchForm />
      {view}
    </div>
  );
};

EventList.propTypes = {
  events: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  events: state.events,
  loading: state.loading,
  error: state.error
});

export default connect(mapStateToProps)(EventList);
