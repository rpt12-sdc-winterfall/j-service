const  performance = require("perf_hooks").performance;
const sampledata = require("./sampleSqlData.js");
const cluster = require("cluster");
const os = require("os").cpus().length;

const seed10M = async () => {

  if (cluster.isMaster) {
    for (let c = 0; c < os; c += 1) {
      cluster.fork();
    }
  } else {

    //let workerId = 1
    let workerId= cluster.worker.id;
    let today = new Date();
    let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("Cluster :", workerId, " starting at:", time);
    const knex = require("knex")({
      client: "mysql",
      connection: {
        host: "127.0.0.1",
        user: "root",
        password: "password",
        database: "booksDB"
      },
      pool: { min: 0, max: 7 }
    });

    const total = 10000000;
    const count = total / os;
    const startId = (count * (workerId - 1)) + 1;
    //const startId = 1;
    const endId = startId + count;

    // Use connect method to connect to the Server
    const books = [];
    // let count = 10000000

    let t0, t1, t2;
    let ms, min, sec;
    t0 = performance.now();
    const batchSize = 10000;
    let batchNumber = 1;
    // console.log('Created default array of empty books:', books);
    for (let i = startId; i < endId; batchNumber += 1) {
      t1 = performance.now();
      // initiate a bunch of new book info
      console.log("Cluster :", workerId, " AND Batchnumber : ", batchNumber,". Starting batch from/to:", i, "/", i + batchSize - 1);
      let books = [];
      for (let b = 0; b < batchSize; b += 1, i += 1) {
        //let book = sampledata();
        // console.log("Extracted book as:", book);
        let book = sampledata();
        book.id = i;
        books.push(book);
      }
      // eslint-disable-next-line no-await-in-loop

      // eslint-disable-next-line no-await-in-loop
      //console.log("Books is:", books);

      //knex('table').where('id', 1).toSQL();
      //let query = knex("books").insert(books).toSQL();
      //console.log("Query is:", query);
      await knex("books").insert(books);

      t2 = performance.now();
      ms = t2 - t1;
      // eslint-disable-next-line no-bitwise
      min = Math.floor((ms / 1000 / 60) << 0);
      sec = Math.floor((ms / 1000) % 60);
      console.log("Cluster : ", workerId, " AND Batchnumber : ", batchNumber, ". Time : ", min, ":", sec);
    }
    t2 = performance.now();
    ms = t2 - t0;
    // eslint-disable-next-line no-bitwise
    min = Math.floor((ms / 1000 / 60) << 0);
    sec = Math.floor((ms / 1000) % 60);
    console.log("Cluster : ", workerId,". Total time is - ", min, ":", sec);
    today = new Date();
    time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    console.log("Cluster : ", workerId,". End time is ", time);
  }
  // callback();
};

seed10M();

module.exports = seed10M;
