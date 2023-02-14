const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"));
app.use((req, res, next) => {
  console.log("From middleware with love!!!");
  return next();
  console.log("Maybe love after calling next() "); // use return before to make sure nothing will running after next()
});
app.use((req, res, next) => {
  console.log("From second middleware with love!!!");
  return next();
});

app.get("/", (req, res) => {
  res.send("HOME PAGE");
});
app.get("/dogs", (req, res) => {
  res.send("WOOF WOOF");
});

app.listen(3000, () => {
  console.log("App is running in localhost:3000");
});
