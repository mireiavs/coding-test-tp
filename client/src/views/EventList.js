import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import SearchForm from "../components/SearchForm";
import Loader from "../components/Loader";

class EventList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formError: null
    };
    this.getFormError = this.getFormError.bind(this);
  }

  // get form error from child component 'SearchForm' (in case of empty fields)
  getFormError(formError) {
    this.setState({
      formError
    });
  }

  render() {
    let eventList = "";
    if (this.props.events) {
      // make a copy of events array and sort by 'createdAt' field
      let events = this.props.events.data.slice(0);
      let sortedEvents = events.sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : -1
      );

      // create event list
      eventList = sortedEvents.map(event => {
        // if event is not verified, add class (red font color) and text ('NOT VERIFIED') to highlight it
        let eventClass = "single-event";
        let verifiedText = "";
        if (!event.verified) {
          eventClass += " not-verified";
          verifiedText = "- NOT VERIFIED";

          // create array of missing fields (if any) and display them next to event title
          let missingFields = [];
          event.invalidFields.forEach(invalidField => {
            if (invalidField.reason === "Field missing.") {
              missingFields.push(invalidField.fieldName);
            }
          });
          if (missingFields.length !== 0) {
            verifiedText += " (Missing fields: ";
            missingFields.forEach(missingField => {
              verifiedText += `${missingField}, `;
            });
            verifiedText = verifiedText.slice(0, -2) + ")";
          }
        }

        // create a list of 'record' properties
        const recordArray = Object.entries(event.record);
        const record = recordArray.map(recordEntry => {
          // if event is not verified search for invalid fields and highlight them (add class for red text and display reason)
          let propertyClass = "";
          let invalidReason = "";
          if (!event.verified) {
            event.invalidFields.forEach(invalidField => {
              if (invalidField.fieldName === recordEntry[0]) {
                propertyClass = "invalid-field";
                invalidReason = `- INVALID FIELD. Reason: ${
                  invalidField.reason
                }`;
              }
            });
          }
          return (
            <li key={recordEntry[0]} className={propertyClass}>
              {recordEntry[0]}: {recordEntry[1]} {invalidReason}
            </li>
          );
        });

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
              {moment(event.createdAt).format("MM-DD-YYYY [at] h:mm A")}{" "}
            </p>

            <ul>{record}</ul>
          </div>
        );
      });
    }

    // create view according to different possibilities (events loading, api or form errors, no results, list of results)
    let view = "";
    if (this.props.loading) {
      view = <Loader />;
    } else if (this.props.apiError) {
      view = <p className="message">ERROR: {this.props.apiError}</p>;
    } else if (this.state.formError) {
      view = <p className="message">{this.state.formError}</p>;
    } else if (this.props.events) {
      if (this.props.events.count !== 0) {
        view = <div className="event-list">{eventList}</div>;
      } else {
        view = (
          <p className="message">
            There are no events that meet these criteria.
          </p>
        );
      }
    }

    return (
      <div className="main">
        <SearchForm getFormError={this.getFormError} />
        {view}
      </div>
    );
  }
}

EventList.propTypes = {
  events: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  events: state.events,
  loading: state.loading,
  apiError: state.apiError
});

export default connect(mapStateToProps)(EventList);
