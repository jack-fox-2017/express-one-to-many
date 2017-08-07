const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')

var createTables = () => {
  db.run('CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, company VARCHAR, phone VARCHAR, email VARCHAR);')
  db.run('CREATE TABLE IF NOT EXISTS Addresses (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR, city VARCHAR, zip_code VARCHAR, ContactId INTEGER, FOREIGN KEY (ContactId) REFERENCES Contacts(id));')
}

createTables()
