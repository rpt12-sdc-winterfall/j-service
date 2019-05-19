const express = require('express');
// bundled with express by default
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const path = require('path');
const books = require('./database/index.js');


const app = express();
const errorHandler = require('express-error-handler');

app.use(express.static(path.join(__dirname, '/../client')));
app.use('/:id', express.static(path.join(__dirname, '/../client')));
app.use(bodyParser.json());
//app.all( '/books', errorHandler.httpError(405) );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/books/:id', (req, res) => {
  console.log("Got request for id:", req.params.id);
  books.retrieve(req.params.id, (err, doc) => {
    // add err handling
    console.log("sending response :", doc, err);
    res.send(doc);
  });
});

app.post('/books', (req, res) => {
  console.log("Post request for:");
  res.send("response for Post");
});

app.delete('/books/:id', (req, res) => {
  console.log("Delete request for id:", req.params.id);
  res.send("response for Delete");
});

app.put('/books', (req, res) => {
  console.log("Update request for:", req.body);
  res.send("response for Update");
});


app.all('/books',
  errorHandler.httpError(405));


// Deliver 404 errors for any unhandled routes.
// Express has a 404 handler built-in, but it
// won't deliver errors consistent with your API.
app.all( '*', errorHandler.httpError(404) );

module.exports = app;
