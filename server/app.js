//var nr = require('newrelic');
const express = require('express');

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
// bundled with express by default
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require('body-parser');
const path = require('path');
const books = require('./database/MySQL/crud/index.js');



const app = express();
// eslint-disable-next-line import/order
//const errorHandler = require('express-error-handler');

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
    console.log("Got from DB retrieve:", err, doc);
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


/* app.all('/books',
  errorHand ler.httpError(405));*/


// Deliver 404 errors for any unhandled routes.
// Express has a 404 handler built-in, but it
// won't deliver errors consistent with your API.
//app.all('*', errorHandler.httpError(404));

module.exports = app;






/* if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  //Check if work id is died
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {
  // This is Workers can share any TCP connection
  // It will be initialized using express
  console.log(`Worker ${process.pid} started`);

  app.get('/cluster', (req, res) => {
    let worker = cluster.worker.id;
    res.send(`Running on worker with id ==> ${worker}`);
  });

  app.listen(3000, function() {
    console.log('Your node is running on port 3000');
  });
} */
