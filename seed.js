const mongoose = require('mongoose');
const model = require('./server/database/model.js');
const sampleData = require('./server/database/sampledata.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/books', { useNewUrlParser: true });
sampleData.seed(model, () => {
  console.log('complete');
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
