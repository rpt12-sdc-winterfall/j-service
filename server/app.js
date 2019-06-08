const express = require('express');
// bundled with express by default
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const path = require('path');
const books = require('./database/MySQL/crud/index.js');
//const model = require('./database/model.js');
//const data = require('./database/sampledata.js');


const app = express();
// eslint-disable-next-line import/order
const errorHandler = require('express-error-handler');

app.use(express.static(path.join(__dirname, '/../client')));
app.use('/:id', express.static(path.join(__dirname, '/../client')));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/books/:id', (req, res) => {
  console.log('Got request for id:', req.params.id);
  books.retrieve(req.params.id, (err, doc) => {
    // add err handling
    console.log('sending response :', doc, err);
    res.send(doc);
  });
});

app.post('/books', (req, res) => {
  console.log('Add request for:');
  const newBook = req.body;

  books.add(newBook, (err, doc) => {
    const resBody = {"success":0,"err":0};
    if (!err) {
      resBody.success = 1;
      resBody.added = doc;
    } else {
      resBody.err = 1;
    }
    res.send(resBody);
  });
});

app.delete('/books/:id', (req, res) => {
  console.log('Delete request for id:', req.params.id);
  books.remove(req.params.id, (err) => {
    const resBody = {"success":0,"err":0};
    if (!err) {
      resBody.success = 1;
    } else {
      resBody.err = 1;
    }
    res.send(resBody);
  });
});

app.patch('/books', (req, res) => {
  console.log('Update request for:', req.body);
  const newBook = req.body;
  books.update(newBook, (err, doc) => {
    const resBody = {"success":0,"err":0};
    if (!err) {
      resBody.success = 1;
      resBody.updated = doc;
    } else {
      resBody.err = 1;
    }
    res.send(resBody);
  });
});


app.all('/books',
  errorHandler.httpError(405));


// Deliver 404 errors for any unhandled routes.
// Express has a 404 handler built-in, but it
// won't deliver errors consistent with your API.
app.all('*', errorHandler.httpError(404));

module.exports = app;
