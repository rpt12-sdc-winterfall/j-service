const knex = require("knex")({
  client: "mysql",
  connection: {
    host: 'ec2-3-88-104-244.compute-1.amazonaws.com',
  user: 'sdc',    
    password: "password",
    database: "booksDB"
  },
  pool: { min: 0, max: 7 }
});

const retrieve = (bookId, callback) => {
  var dataArr = [];
  console.log("getting from database for id:", bookId);
  knex("books")
    .select("*")
    .where({ id: bookId })
    .then(function(result) {
      //console.log("Got from database:", result);
      result.forEach(function(value) {
        let string=JSON.stringify(value);
        console.log('>> string: ', string );
        var json =  JSON.parse(string);
        json.links =  {
          kindle: json.kindle,
          amazon: json.amazon,
          worldcat: json.worldcat,
          };
          json.links.stores = {
            audible: json.audible,
            barnesAndNoble: json.barnesAndNoble,
            walmart: json.walmart,
            apple: json.apple,
            google: json.google,
            abebooks: json.abebooks,
            bookDesository: json.bookDesository,
            indigo: json.indigo,
            alibris: json.alibris,
            betterWorldBooks: json.betterWorldBooks,
            indieBound: json.indieBound,
          };
          json.ratings= {
            five: json.rating_five ,
            four: json.rating_four,
            three: json.rating_three,
            two: json.rating_two,
            one: json.rating_one,
          };
          json.metadata= {
            originalTitle: json.originalTitle,
            isbn: json.isbn,
            isbn13: json.isbn13,
            asin: json.asin,
            language: json.language,

          };
          json.metadata.series= {
            name: json.name,
            url: json.url,
          };


        dataArr.push(json);
      });
      if (dataArr.length > 0 ) {
        callback(null,dataArr[0]);
      } else {
        callback(null,null);
      }


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
