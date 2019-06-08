/* eslint-disable no-shadow */

const MongoClient = require('mongodb').MongoClient;
const cluster = require('cluster');
const os = require('os').cpus().length;

const { performance } = require('perf_hooks');
const sampledata = require('./sampledata.js');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'booksDB';

const asyncInsert = (collection, arr) => new Promise((resolve, reject) => {
  collection.insertMany(arr, (err, docs) => {
    console.log('Done inserting');
    if (err) {
      reject(err);
    } else {
      resolve(docs);
    }
  });
});

const seed10M = () => {
  if (cluster.isMaster) {
    for (let c = 0; c < os; c += 1) {
      cluster.fork();
    }
  } else {
    // Create a new MongoClient
    const client = new MongoClient(url);
    console.log('New Cluster', cluster.worker.id);
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log('Start time on cluster:', cluster.worker.id, ' is ', time);
    const total = 10000000;
    const count = total / os;
    const startId = (count * (cluster.worker.id - 1)) + 1;
    const endId = startId + count;

    // Use connect method to connect to the Server
    client.connect(async (err, client) => {
      console.log('Connected to server for new cluster:', cluster.worker.id);
      const db = client.db(dbName);
      const collection = db.collection('books');
      const books = [];
      // let count = 10000000

      const t0 = performance.now();
      const batchSize = 10000;
      for (let b = 0; b < batchSize; b += 1) {
        const book = {};
        books.push(book);
      }
      // console.log('Created default array of empty books:', books);
      for (let i = startId; i <= endId;) {
      // initiate a bunch of new book info
        console.log('Starting batch from/to:', i, '/', i + batchSize);
        const books = [];
        for (let b = 0; b < batchSize; b += 1, i += 1) {
          const book = {};
          // console.log("Extracted book as:", book);
          sampledata(book);
          book._id = i;
          book.bookid = i;
          books.push(book);
        }
        // eslint-disable-next-line no-await-in-loop

        // eslint-disable-next-line no-await-in-loop
        await collection.insertMany(books, {
          writeConcern: { w: 0, j: false },
          ordered: false,
        // bypassDocumentValidation: true
        });
        // await asyncInsert(collection, books);
      /* const t3 = performance.now();
      const ms1 = t3 - t0;
      const min1 = Math.floor((ms1 / 1000 / 60) << 0);
      const sec1 = Math.floor((ms1 / 1000) % 60);
      console.log('Time taken for the batch', min1, ':', sec1); */
      }
      const t1 = performance.now();
      const ms = t1 - t0;
      // eslint-disable-next-line no-bitwise
      const min = Math.floor((ms / 1000 / 60) << 0);
      const sec = Math.floor((ms / 1000) % 60);
      console.log('Total time taken on cluster:', cluster.worker.id, ' is -', min, ':', sec);
      client.close();
      today = new Date();
      time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      console.log('End time on cluster:', cluster.worker.id, ' is ', time);
    // callback();
    });
  }
};

seed10M();

module.exports = seed10M;
