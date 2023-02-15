const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"));

app.use((req, res, next) => {
  req.requestTime = Date.now();
  console.log(req.method, req.path);
  next();
});

app.use("/dogs", (req, res, next) => {
  console.log("I love dogs !!!!");
  next();
});

// app.use((req, res, next) => {
//   console.log("From middleware with love!!!");
//   return next();
//   console.log("Maybe love after calling next() "); // use return before to make sure nothing will running after next()
// });
// app.use((req, res, next) => {
//   console.log("From second middleware with love!!!");
//   return next();
// });

app.get("/", (req, res) => {
  console.log(`REQUESTED DATE: ${req.requestTime}`);
  res.send("HOME PAGE");
});
app.get("/dogs", (req, res) => {
  console.log(`REQUESTED DATE: ${req.requestTime}`);

  res.send("WOOF WOOF");
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!!!");
});

app.listen(3000, () => {
  console.log("App is running in localhost:3000");
});
