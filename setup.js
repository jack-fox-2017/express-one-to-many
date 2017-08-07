var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./db/data.db')

db.serialize(function(){
  var create_user = `CREATE TABLE IF NOT EXISTS Users
  (id INTEGER PRIMARY KEY AUTOINCREMENT, username VARCHAR(100),
  firstname VARCHAR(100), lastname VARCHAR(100), email VARCHAR(100))`
  db.run(create_user)

  var create_address= `CREATE TABLE IF NOT EXISTS Address
  (id INTEGER PRIMARY KEY AUTOINCREMENT, street VARCHAR(225),
   city VARCHAR(225), zipcode VARCHAR(225),
   user_id INTEGER , FOREIGN KEY(user_id) REFERENCES Users(id))`
   db.run(create_address)
})
