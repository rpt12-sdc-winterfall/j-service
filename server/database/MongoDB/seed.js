const mongoose = require('mongoose');
const model = require('model.js');
const sampleData = require('seedMongoose.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/booksDB', { useNewUrlParser: true });
sampleData.seed(model, () => {
  console.log('complete');
  mongoose.connection.close(() => {
    process.exit(0);
  });
});
