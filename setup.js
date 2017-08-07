const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/database.db')

db.serialize(function(){
  var queryContacts = `CREATE TABLE IF NOT EXISTS Contacts(id INTEGER primary key AUTOINCREMENT, name text, company text, telp_number INTEGER, email text);`
  var queryAdresses = `CREATE TABLE IF NOT EXISTS Adresses(id INTEGER primary key AUTOINCREMENT, jalan text, kota string, provinsi string, contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES Contacts(id))`
  db.run(queryContacts)
  db.run(queryAdresses)
})
