const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const errorhandler = require("errorhandler");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/api/auth", require("./routes/auth"));

if (process.env.NODE_ENV === "development") {
  // only use in development
  app.use(errorhandler({ log: errorNotification }));
}

function errorNotification(_, str, req) {
  var title = "Error in " + req.method + " " + req.url;

  notifier.notify({
    title: title,
    message: str,
  });
}

module.exports = app;
