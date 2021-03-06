const express = require("express");
const path = require("path");
const Rollbar = require("rollbar");

let rollbar = new Rollbar({
  accessToken: "6c3fe3c25172474a818654e08c34780f",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = express();

app.use(express.json());
app.use("/style", express.static("../styles.css"));

let students = [];

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
  rollbar.info("html file served successfully.");
});

app.post("/api/student", (req, res) => {
  let { name } = req.body;
  name = name.trim();

  const index = students.findIndex((studentName) => studentName === name);

  if (index === -1 && name !== "") {
    students.push(name);
    rollbar.log("Student added successfully", {
      author: "Scott",
      type: "manual entry",
    });
    res.status(200).send(students);
  } else if (name === "") {
    rollbar.error("No name given");
    res.status(400).send("must provide a name.");
  } else {
    rollbar.error("student already exists");
    res.status(400).send("that student already exists");
  }
});

//app.get("/api/function", (req, res) => {});
//fakeFunction();

const port = process.env.PORT || 4545;

// rolly
app.use(rollbar.errorHandler());

app.listen(port, () => console.log(`listening on port ${port}!`));
