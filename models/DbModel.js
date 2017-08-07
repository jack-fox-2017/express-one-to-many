const sqlite3 = require('sqlite3')
  .verbose()
class DbModel {
  constructor(filename) {
    this.connection = new sqlite3.Database(filename);
  }
  createTableAddress() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS addresses
             (id INTEGER PRIMARY KEY AUTOINCREMENT, alamat text, kodepos integer);`);
  }
  createTableGroups() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS groups
           (id INTEGER PRIMARY KEY AUTOINCREMENT, name_of_group text);`);
  }
  createTableContacts() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS contacts
             (id INTEGER PRIMARY KEY AUTOINCREMENT, name text, company text, telp_number text, email text);`);
  }
  createTableProfiles() {
    this.connection.run(`CREATE TABLE IF NOT EXISTS profiles
           (id INTEGER PRIMARY KEY AUTOINCREMENT, username text, contacts_id integer);`);
  }
}
module.exports = DbModel
