import React from "react";

// component import
import EventList from "./views/EventList";

// redux imports
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div id="wrapper">
        <EventList />
      </div>
    </Provider>
  );
}

export default App;
