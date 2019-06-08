const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "booksDB"
  },
  pool: { min: 0, max: 7 }
});

const retrieve = (bookId, callback) => {
  var dataArr = [];
  knex("books")
    .select("*")
    .where({ id: bookId })
    .then(function(result) {
      result.forEach(function(value) {
        dataArr.push(value);
      });
      callback(null,dataArr);
    });
};

const findMaxId = callback => {
  knex("books")
    .max(id)
    .then(function(result) {
      callback(null,result);
    });
};

const add = (newbookData, callback) => {
  console.log("New Book Data:", newbookData);
  knex("books")
    .insert(newbookData)
    .then(function(result) {
      callback(null,result);
    })
    .catch(err => callback(err));
};

const update = (bookData, callback) => {
  console.log("Starting  database update:", bookData);
  knex("books")
    .where({ id: bookData.id })
    .update({ title: bookData.title })
    .then(result => {
      console.log("Update database result is:", result);
      let updated={"id":0};
      if (result > 0) {
        updated.id = bookData.id;
      }
      callback(null, updated);
    })
    .catch(err => {
      console.log("Error on database update:", err)
      callback(err)});
};

const remove = (id, callback) => {
  knex("books")
    .where({ id: id })
    .del()
    .then(result => {
      callback(null, result);
    })
    .catch(err => callback(err));
};

process.on("SIGINT", () => {
  knex.destroy();
});

module.exports = {
  retrieve,
  add,
  remove,
  update,
  findMaxId
};
