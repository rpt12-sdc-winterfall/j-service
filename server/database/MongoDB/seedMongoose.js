/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

const { performance } = require('perf_hooks');
const sampledata = require('./sampledata.js');

const generateNewBookWithFakeData = function (Model) {
  const book = {};
  sampledata(book);
  const newBook = new Model(book);
  // addFakeData(book);
  return newBook;
};

const seed = (Model, callback) => {
  // clean out current database, if any test records clogging up
  Model.deleteMany({}, async () => {
    const queries = [];
    for (let i = 1; i <= 100; i += 1) {
      // initiate a bunch of new book info
      const book = generateNewBookWithFakeData(Model);
      book.bookid = i;

      queries.push(book.save());
    }
    await Promise.all(queries);
    callback();
  });
};

const asyncInsert = (Model, arr) => new Promise((resolve, reject) => {
  Model.insertMany(arr, (err, docs) => {
    console.log('Done inserting');
    if (err) { reject(err); } else { resolve(docs); }
  });
});

const seed10M = (Model, callback) => {
  // clean out current database, if any test records clogging up
  Model.deleteMany({}, async () => {
    const books = [];
    // let count = 10000000
    const count = 10000000;
    const t0 = performance.now();
    const batchSize = 1000;
    for (let b = 0; b < batchSize; b += 1) {
      const book = {};
      books.push(book);
    }
    console.log("Created default array of empty books:", books);
    for (let i = 1; i <= count;) {
      // initiate a bunch of new book info
      console.log("Starting batch from:", i);
      for (let b = 0; b < batchSize; b += 1, i += 1) {
        const book = books[b];
        //console.log("Extracted book as:", book);
        sampledata(book);
        book.bookid = i;
        books[b] = book;
      }
      // eslint-disable-next-line no-await-in-loop
      await asyncInsert(Model, books);
      let t3 = performance.now();
      let ms1= t3 - t0;
      let min1 = Math.floor((ms1 / 1000 / 60) << 0);
      let sec1 = Math.floor((ms1 / 1000) % 60);
      console.log('Total time taken:', min1, ':', sec1);
    }
    /* let batchNumber = 0;

    for (let i = 0; i < count; i += batchSize) {
      batchNumber += 1;
      console.log("Starting batch :", batchNumber, "from i:", i+1);
      const arr = books.slice(i, i + batchSize);
      await asyncInsert(Model, arr);
    } */
    const t1 = performance.now();
    const ms = t1 - t0;
    const min = Math.floor((ms / 1000 / 60) << 0);
    const sec = Math.floor((ms / 1000) % 60);
    console.log('Total time taken:', min, ':', sec);
    callback();
  });
};


module.exports = {
  generateNewBookWithFakeData,
  seed,
  seed10M,
};
