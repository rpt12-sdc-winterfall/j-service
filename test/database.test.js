const mongoose = require('mongoose');
const model = require('../server/database/model.js');
const sampleData = require('../server/database/sampledata.js');
const database = require('../server/database/index.js');


/* const testModel = model;

describe('seeding script', () => {
  beforeAll((done) => {
    mongoose.connect('mongodb://localhost/testDatabase', { useNewUrlParser: true });
    sampleData.seed(model, () => {
      done();
    });
  });

  test('should seed the database with 100 records', (done) => {
    testModel.find({}, (err, docs) => {
      expect(docs.length).toBe(100);
      done();
    });
  });

  test('should seed the database with a correct model', (done) => {
    model.findOne({ id: 6 }, (err, doc) => {
      // eslint-disable-next-line no-underscore-dangle
      const actual = doc._doc;

      expect(actual).toContainAllKeys([
        'id',
        '__v',
        '_id',
        'title',
        'author',
        'description',
        'ratings',
        'reviews',
        'links',
        'type',
        'pages',
        'publishDate',
        'publisher',
        'metadata',
        'image',
      ]);

      done();
    });
  });

  afterAll((done) => {
    model.deleteMany({}, () => {
      mongoose.disconnect();
      return done();
    });
  });
}) */

describe('CRUD script', () => {
  test('should add the new book', (done) => {
    const newBook = sampleData.getFakeBookData();
    database.add(newBook, (err, addedBook) => {
      expect(err).toBe(null);
      expect(newBook.title).toBe(addedBook.title);
      done();
    });
  });

  test('should update the existing book', (done) => {
    const newBook = {id:13, title:'test Jyoti'};
    database.update(newBook, (err, result) => {
      expect(err).toBe(null);
      expect(newBook.title).toBe(result.title);
      done();
    });
  });

  /* test('should delete a book for id', (done) => {
    database.findMaxId((id) => {
      database.remove(id, (err, result) => {
        // console.log("Delete result:", result);
        expect(err).toBe(null);
        const count = id === 0 ? 0 : 1;
        expect(result.deletedCount).toBe(count);

        done();
      });
    });
  }); */
});
