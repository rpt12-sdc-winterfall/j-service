/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const fake = require("faker");

const getFakeBookData = function() {
  let book ={};
  book.title = fake.random.words(3);
  book.author = fake.name.findName();
  book.book_description = fake.lorem.paragraphs();
  book.image_url = "http://lorempixel.com/480/640/abstract/";
  book.rating_five = fake.random.number();
  book.rating_four = fake.random.number();
  book.rating_three = fake.random.number();
  book.rating_two = fake.random.number();
  book.rating_one = fake.random.number();
  book.reviews = fake.random.number();
  book.kindle = fake.internet.url();
  book.amazon = fake.internet.url();
  book.audible = fake.internet.url();
  book.barnesAndNoble = fake.internet.url();
  book.walmart = fake.internet.url();
  book.apple = fake.internet.url();
  book.google = fake.internet.url();
  book.abebooks = fake.internet.url();
  book.bookDesository = fake.internet.url();
  book.indigo = fake.internet.url();
  book.alibris = fake.internet.url();
  book.betterWorldBooks = fake.internet.url();
  book.indieBound = fake.internet.url();
  book.book_type = fake.random.word();
  book.pages = fake.random.number({ max: 3000 });
  book.publishDate = fake.date.past();
  book.publisher = fake.company.companyName();
  book.originalTitle = book.title;
  book.isbn = fake.random.number();
  book.isbn13 = fake.random.number();
  book.book_language = "English";
  const r = Math.floor(Math.random() * Math.floor(10));
 // if (r % 2 === 0) {
    book.series_name = fake.random.words(2);
    book.series_url = fake.internet.url();
  //}
  /*else {
    book.series_name = '';
    book.series_url
  }*/
  return book;
};

module.exports = getFakeBookData;
