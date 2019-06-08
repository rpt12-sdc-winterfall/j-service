/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const fake = require('faker');

const setFakeBookData = function (book) {
  book.bookid = 0;
  book.title = fake.random.words(3);
  book.author = fake.name.findName();
  book.description = fake.lorem.paragraphs();
  book.ratings = {
    five: fake.random.number(),
    four: fake.random.number(),
    three: fake.random.number(),
    two: fake.random.number(),
    one: fake.random.number(),
  };
  book.reviews = fake.random.number();
  book.links = {
    kindle: fake.internet.url(),
    amazon: fake.internet.url(),
    stores: {
      audible: fake.internet.url(),
      barnesAndNoble: fake.internet.url(),
      walmart: fake.internet.url(),
      apple: fake.internet.url(),
      google: fake.internet.url(),
      abebooks: fake.internet.url(),
      bookDesository: fake.internet.url(),
      indigo: fake.internet.url(),
      alibris: fake.internet.url(),
      betterWorldBooks: fake.internet.url(),
      indieBound: fake.internet.url(),
    },
  };
  book.type = fake.random.word();
  book.pages = fake.random.number({ max: 3000 });
  book.publishDate = fake.date.past();
  book.publisher = fake.company.companyName();
  book.metadata = {
    originalTitle: book.title,
    isbn: fake.random.number(),
    isbn13: fake.random.number(),
    language: 'English',
  };
  book.image = 'http://lorempixel.com/480/640/abstract/';
  const r = Math.floor(Math.random() * Math.floor(10));
  if (r % 2 === 0) {
    book.series = {
      name: fake.random.words(2),
      url: fake.internet.url(),
    };
  }
  // return book;
};

module.exports = setFakeBookData;

