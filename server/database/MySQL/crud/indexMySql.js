const mysql = require('mysql');

/* var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "booksDB"
});
connection.connect(); */
const pool = mysql.createPool({
  connectionLimit: 100, // important
  //host: 'ec2-3-88-104-244.compute-1.amazonaws.com:3306',
  //user: 'sdc',

  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'booksDB',
  debug: false,
});

const getConnection = () => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) {
      reject(err);
    } else {
      resolve(connection);
    }
  });
});


/* connection.query('SELECT * from books', (err, rows, fields) => {
  if (!err) console.log('The solution is: ', rows);
  else console.log('Error while performing Query.');
});

connection.end(); */

const retrieve = (bookId, callback) => {
  let selectQuery = 'SELECT * FROM books WHERE id = ?';
  let query = mysql.format(selectQuery,[bookId]);
  pool.query(query,(err, data) => {
    if(err) {
        console.error(err);
        callback(err);
    }
    // rows fetch
    console.log(data);
    callback(err,data);
});


const findMaxId = (callback) => {
  let selectQuery = 'SELECT max(id) FROM books';
  let query = mysql.format(selectQuery,[bookId]);
  pool.query(query,(err, data) => {
    if(err) {
        console.error(err);
        callback(err);
    }
    // rows fetch
    console.log(data);
    callback(err,data);
  });
};

const add = (newbookData, callback) => {
  console.log('New Book Data:', newbookData);
  findMaxId((id) => {
    // eslint-disable-next-line no-param-reassign
    newbookData.bookid = id + 1;
    const newbook = new bookModel(newbookData);
    newbook.save((err, result) => {
      console.log('Add result is', result);
      callback(err, result);
    });
  });
};

const update = (bookData, callback) => {
  bookModel.findOne({ bookid: bookData.id }, (err, book) => {
    if (!err) {
      book.title = bookData.title;
      book.save((error, result) => {
        console.log('Update result is', result);
        callback(error, result);
      });
    } else {
      console.log('Book not found for update');
      callback(err, book);
    }
  });
};

const remove = (id, callback) => {
  bookModel.deleteOne({ bookid: id }, (err, result) => {
    console.log('Delete result:', result);
    callback(err, result);
  });
};

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

module.exports = {
  retrieve,
  add,
  remove,
  update,
  findMaxId,
};
