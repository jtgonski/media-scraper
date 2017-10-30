
const express = require("express"); 

// Our scraping tools
const request = require("request");
const cheerio = require("cheerio");


//notes and articles models
const Note = require("../models/Note.js");
const Article = require("../models/Article.js");

const app = express();

// Routes
// ======

module.exports = (app) => {

//default route
app.get("/", (req, res) => {
  res.render("index"); 
});

// A GET request to scrape NPR website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  request("http://www.npr.org/sections/news/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);
    // Now, we grab every h2 within an article tag, and do the following:
    $("article").each(function(i, element) {

      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this).children("div.item-info").children("h2.title").children("a").text();
      result.link = $(this).children("div.item-info").children("h2.title").children("a").attr("href");
      result.teaser =  $(this).children("div.item-info").children("p.teaser").children("a").text();
      result.date =  $(this).children("div.item-info").children("p.teaser").children("a").children("time").attr("datetime");

      // Using our Article model, create a new entry
      // This effectively passes the result object to the entry (and the title and link)
      var entry = new Article(result);

      // Now, save that entry to the db
      entry.save((err, doc) => {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });

    });
  });

});


// This will get the articles we scraped from the mongoDB
app.get("/articles", (req, res) => {
  // Grab every doc in the Articles array
  Article.find().sort({ date: -1 }).limit(15).exec( (error, doc) => {
    const hbsObject = {
      article: doc
    }
    console.log(hbsObject); 
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.render("index", hbsObject);
      // res.json(doc);
    }
  });
});

// Grab an article by it's ObjectId
app.get("/articles/:id", (req, res) => {
  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
  Article.findOne({ "_id": req.params.id })
  // ..and populate all of the notes associated with it
  .populate("note")
  // now, execute our query
  .exec((error, doc) => {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise, send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});


// Create a new note or replace an existing note
app.post("/articles/:id", (req, res) => {
  // Create a new note and pass the req.body to the entry
  const newNote = new Note(req.body);
  console.log(newNote);

  // And save the new note the db
  newNote.save((error, doc) => {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Otherwise
    else {
      res.json(doc);
      // // Use the article id to find and update it's note
      // Article.findOneAndUpdate({ "_id": req.params.id }, { "note": doc._id })
      // // Execute the above query
      // .exec((err, doc) => {
      //   // Log any errors
      //   if (err) {
      //     console.log(err);
      //   }
      //   else {
      //     // Or send the document to the browser
      //     res.json(doc);
      //   }
      // });
    }
  });
});

}

