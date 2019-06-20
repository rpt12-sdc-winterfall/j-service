const seed10M = require('./server/database/seedMongoDB.js');

seed10M(() => {
  console.log('Complete');
  process.exit(0);
});
