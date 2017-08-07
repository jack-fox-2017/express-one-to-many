var sqlite3 = require('sqlite3')
  .verbose();
var db = new sqlite3.Database('./db/data.db');

function createTable() {
  db.run(`CREATE TABLE contacts
           (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, telp_number text, email text);`);
  console.log("Table created");
}

function createTableG() {
  db.run(`CREATE TABLE groups
           (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text);`);
  console.log("Table created");
}

createTable()
createTableG()
