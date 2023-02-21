const express = require("express");
const morgan = require("morgan");
const AppError = require("./AppError");

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

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chicken") {
    next();
  }
  throw new AppError("password required", 401);
  // res.send("YOU NEED A PASSWORD");
  // throw new AppError( "Password required");
};

app.get("/", (req, res) => {
  console.log(`REQUESTED DATE: ${req.requestTime}`);
  res.send("HOME PAGE");
});

app.get("/error", (req, res) => {
  chicken.fly();
});

app.get("/dogs", (req, res) => {
  console.log(`REQUESTED DATE: ${req.requestTime}`);

  res.send("WOOF WOOF");
});

app.get("/secret", verifyPassword, (req, res) => {
  res.send("Sometimes I put headphone");
});

app.get("/admin", (req, res) => {
  throw new AppError("You are not an admin", 403);
});

app.use((req, res) => {
  res.status(404).send("NOT FOUND!!!");
});

// app.use((err, req, res, next) => {
//   console.log("****************************************");
//   console.log("****************ERROR*******************");
//   console.log("****************************************");
//   // res.status(500).send("OH BOY WE GOT AN ERROR");
//   next(err);
// });
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("App is running in localhost:3000");
});
