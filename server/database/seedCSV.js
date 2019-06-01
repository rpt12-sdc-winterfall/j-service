// const csv = require('csv-parser');
// const fs = require('fs');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const sampledata = require('./sampledata.js');
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
  path:'data4.csv',
  header: [{id:'document', title:'Document'}]
})


const data = [
  {
    name: 'John',
    surname: 'Snow',
    age: 26,
    gender: 'M',
    description:'ABC\D'
  }, {
    name: 'Clair',
    surname: 'White',
    age: 33,
    gender: 'F',
    description:'ABC,D'
  }, {
    name: 'Fancy',
    surname: 'Brown',
    age: 78,
    gender: 'F',
    description:'ABCD'
  }
];


const seed = () => {
  console.log('Starting seeding :');
let count = 2
let batchSize = 2;
for (let i = 1; i <= count;) {
  // initiate a bunch of new book info
  console.log('Starting batch from:', i);
  let books = [];
  for (let b = 0; b < batchSize; b += 1, i += 1) {
    let book = {};
    // console.log("Extracted book as:", book);
    sampledata(book);
    book._id = i;
    book.bookid = i;
    let doc = JSON.stringify(book);
    //console.log("Extracted book as:", book);
    books.push(doc);
  }
console.log("Books:", books);
csvWriter
  .writeRecords(books)
  .then(()=> console.log('The CSV file was written successfully'));
} };

seed();

module.exports = seed;