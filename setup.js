const Sql = require('sqlite3').verbose();
let db = new Sql.Database('./db/data.db');

db.serialize(()=>{
  //create table users
  let qry_createUsers = `CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(25), firstname VARCHAR(25), lastname VARCHAR(25), email VARCHAR(25))`;
  db.run(qry_createUsers);

  //create table profiles
  let qry_createProfile = `CREATE TABLE IF NOT EXISTS Profiles(id INTEGER PRIMARY KEY AUTOINCREMENT,
    hometown VARCHAR(25), birth_year INT, relationship_status VARCHAR(50), users_id INTEGER UNIQUE, FOREIGN KEY(users_id) REFERENCES Users(id))`;
  db.run(qry_createProfile);

  //create table contacts
  let qry_createContacts = `CREATE TABLE IF NOT EXISTS Contacts(id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50), company VARCHAR(50), phone VARCHAR(16), email VARCHAR(25))`;
  db.run(qry_createContacts);

  //create table addresses
  let qry_createAddresses = `CREATE TABLE IF NOT EXISTS Addresses(id INTEGER PRIMARY KEY AUTOINCREMENT,
    street VARCHAR(100), city VARCHAR(50), zip_code VARCHAR(10), contacts_id INT, FOREIGN KEY(contacts_id) REFERENCES Contacts(id))`;
  db.run(qry_createAddresses);
});
