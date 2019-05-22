
const mongoose = require('mongoose');
const bookModel = require('./model.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/books', { useNewUrlParser: true });
const retrieve = (id, callback) => {
  bookModel.findOne({ id }, (err, doc) => {
    // console.log('doc is', doc);
    callback(err, doc);
  });
};

const findMaxId = (callback) => {
  bookModel.findOne({})
    .sort('-id')
    .exec((err, item) => {
      if (item) {
        callback(item.id);
      } else {
        callback(0);
      }
    });
};
const add = (newbookData, callback) => {
  console.log('New Book Data:', newbookData);
  findMaxId((id) => {
    // eslint-disable-next-line no-param-reassign
    newbookData.id = id + 1;
    const newbook = new bookModel(newbookData);
    newbook.save((err, result) => {
      console.log('Add result is', result);
      callback(err, result);
    });
  });
};


const update = (bookData, callback) => {
  bookModel.findOne({ id: bookData.id }, (err, book) => {
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
  bookModel.deleteOne({ id }, (err, result) => {
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
