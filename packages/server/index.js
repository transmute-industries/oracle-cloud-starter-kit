var express = require("express");
var bodyParser = require("body-parser");
var MYPORT = process.env.PORT || "8080";
var app = express();
// var fs = require("fs");
// var path = require("path");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "*/*" }));
app.use(express.static("./packages/dapp/build"));

var router = express.Router();

const transmuteAdapter = require("./transmuteAdapter");

router.use(function(request, response, next) {
  console.log("REQUEST:" + request.method + "   " + request.url);
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  response.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  response.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// GET
router.route("/").get(async (request, response) => {
  response
    .json({
      streamModel: await transmuteAdapter.getStreamModel()
    })
    .end();
});

// Start the server
app.use("/transmute", router);

app.listen(MYPORT);

// Announce ourselves
console.log("Server started on port: " + MYPORT);
