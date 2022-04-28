const express = require("express");
const path = require("path");

const app = express();

//include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "6c3fe3c25172474a818654e08c34780f",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.get("/", (req, res) => {
  res.sendfile(path.join(__dirname, "../index.html"));
  rollbar.log("initial endpoint hit");
});

const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
