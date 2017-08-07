var sql = require('sqlite3').verbose()
var db = new sql.Database('./db/data.db')

// Structure table:
// * Contacts: id type integer, name type string, company type string, phone type string, email type string
// * Addresses: id type integer, street type string, city type integer, zip_code type string
// * tambahkan foreign key yang diperlukan!

function createContactsTable(){
  db.run(`CREATE TABLE IF NOT EXISTS contacts
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
      name VARCHAR(50), company VARCHAR(50),
      telp_number VARCHAR(50), email VARCHAR(50))`)
}

function createAddressesTable(){
  db.run(`CREATE TABLE IF NOT EXISTS addresses
  (street VARCHAR(50) PRIMARY KEY, city VARCHAR(50), zip_code INTEGER, contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id))`)
}

createContactsTable()
createAddressesTable()
