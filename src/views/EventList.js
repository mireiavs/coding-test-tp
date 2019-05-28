import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import SearchForm from "../components/SearchForm";
import moment from "moment";

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
        verifiedText = "- EVENT NOT VERIFIED";
      }

      return (
        <div className={eventClass} key={event.id}>
          <h4>
            {event.record.event_name ||
              event.record.evtname ||
              event.record.state_name}{" "}
            - Creation date:{" "}
            {moment(event.createdAt).format("MM-DD-YYYY [at] HH:mm")}{" "}
            {verifiedText}
          </h4>
          <ul>{record}</ul>
        </div>
      );
    });
  }
  return (
    <div className="main">
      <SearchForm />

      {props.loading ? (
        <div>Loading</div>
      ) : props.error ? (
        <div>
          <p className="error">ERROR: {props.error}</p>
        </div>
      ) : (
        <div className="event-list">{eventList}</div>
      )}
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
