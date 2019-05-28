const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

app.options("*", cors());

app.get("/events/:gameId/:provider/:tpdid", (req, res) => {
  const config = {
    params: {
      limit: 30,
      gameId: req.params.gameId,
      provider: req.params.provider,
      tpdid: req.params.tpdid
    }
  };

  axios
    .get(
      "http://react-test-backend.us-east-1.elasticbeanstalk.com/analytics-events",
      config
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(err => console.log(err));
});

app.listen(5000, () => {
  console.log("Listening on 5000");
});
