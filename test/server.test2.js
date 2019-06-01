const request = require('supertest');
const app = require('../server/app.js');

describe('Test the root path', () => {
  test('It should GET a well-structured object', (done) => {
    request(app).get('/books/7').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.body).toContainAllKeys([
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
});
