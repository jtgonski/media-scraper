
// trigger
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
// Requiring our Note and Article models
const Note = require("./models/Note.js");
const Article = require("./models/Article.js");
const Saved = require("./models/Saved.js");
// Our scraping tools
const request = require("request");
const cheerio = require("cheerio");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

const PORT = process.env.PORT || 3000;

// Initialize Express
const app = express();

const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));
app.use(bodyParser.json());

// Import routes and give the server access to them.
const routes = require("./controllers/routes.js")(app);
// app.use("/", routes);

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/media");
// mongoose.connect("mongodb://heroku_9t0lpr5j:gt6shbdpundku1i2363mbqnuiv@ds231725.mlab.com:31725/heroku_9t0lpr5j");
const db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});




