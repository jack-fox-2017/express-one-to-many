var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/database.db');


db.serialize (function(){
  var query_create_contact = `CREATE TABLE IF NOT EXISTS Contact(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name varchar(100), company varchar(100),
    telp_number varchar(12),
    email varchar(25))`

    db.run(query_create_contact);
    console.log(`Succes create Table Contact`);

  db.serialize(function(){
    var query_create_profile = `CREATE TABLE IF NOT EXISTS Profile(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nickname varchar(255),
      account varchar(255),
      contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES Contact(id), UNIQUE(contact_id))`

    db.run(query_create_profile);
    console.log(`Sucess create Table Profile`);

    var query_create_address = `CREATE TABLE IF NOT EXISTS Address(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      street_name varchar(255),
      city varchar(255),
      province varchar(255),
      zipcodes INTEGER,
      contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES Contact(id))`

    db.run(query_create_address)
    console.log(`Sucess create Table Address`);
  })
})

//module.exports = createTable();
