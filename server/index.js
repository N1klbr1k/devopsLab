const express = require("express");
const path = require("path");

const app = express();

app.get("/", (req, res) => {
  res.sendfile(path.join(__dirname, "../index.html"));
});

const port = process.env.PORT || 5005;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
