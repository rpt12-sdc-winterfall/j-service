// const csv = require('csv-parser');
// const fs = require('fs');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const sampledata = require('./sampleSqlData.js');
/* const csvWriter = createCsvWriter({
  path: 'seedData.csv',
  header: [
    {id: 'name', title: 'Name'},
    {id: 'surname', title: 'Surname'},
    {id: 'age', title: 'Age'},
    {id: 'gender', title: 'Gender'},
    {id: 'description', title: 'Description'},
  ]
}); */

const csvWriter = createCsvWriter({
  path: 'data6.csv',
  header: [
    {'id':'title','title':'Title'},
    {'id':'author','title':'Author'},
    {'id':'book_description','title':'Book_description'},
    {'id':'series_name','title':'Series_name'},
    {'id':'series_url','title':'Series_url'},
  ],
});
/*header: [
  'title',
  'author',
  'book_description',
  'image_url',
  'rating_five',
  'rating_four',
  'rating_three',
  'rating_two',
  'rating_one',
  'reviews',
  'kindle',
  'amazon',
  'audible',
  'barnesAndNoble',
  'walmart',
  'apple',
  'google',
  'abebooks',
  'bookDesository',
  'indigo',
  'alibris',
  'betterWorldBooks',
  'indieBound',
  'book_type',
  'pages',
  'publish',
  'publisher',
  'originalTitle',
  'isbn',
  'isbn13',
  'book_language',
  'series_name',
  'series_url',
],*/
const seed = async () => {
  console.log('Starting seeding :');
  const count = 2;
  const batchSize = 2;
  let i =1;
  //for (let i = 1; i <= count;) {
  // initiate a bunch of new book info
    console.log('Starting batch from:', i);
    const books = [];
    for (let b = 0; b < batchSize; b += 1, i += 1) {
      let book = sampledata();
      // console.log("Extracted book as:", book);
      //const doc = JSON.stringify(book);
      // console.log("Extracted book as:", book);
      books.push(book);
    }
    console.log('Books:', books);
     csvWriter
      .writeRecords(books)
      .then(() => console.log('The CSV file was written successfully'));
  //}
};

seed();

module.exports = seed;
