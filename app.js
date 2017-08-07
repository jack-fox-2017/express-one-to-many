const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const app = express();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/database.db')
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

//================Kontak=================
//display all contact list
app.get("/home/contacts", function(req, res) {
  db.all(`SELECT * FROM Contacts`,function(err, rows){
    res.render("contacts", {data : rows})
  })
})
//display form isi Kontak
app.get("/home/contacts/add", function(req, res) {
  res.render("form")
})

//insert ke database
app.post("/home/contacts/add", function(req, res) {
  db.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES
  ("${req.body.name}","${req.body.company}","${req.body.telp})","${req.body.email}")`)
  res.redirect("/home/contacts")
})

//display database
app.get("/home/contacts/edit/:id",function(req, res) { //routing - logic - render // populate == value
  db.all(`SELECT * FROM Contacts WHERE id = "${req.params.id}"`, function(err, db_Contact) {
    res.render("edit", {data : db_Contact})
  })
})
//insert hasil edit database
app.post("/home/contacts/edit/:id",function(req, res) {
  db.run(`UPDATE Contacts SET name = "${req.body.name}", company = "${req.body.company}", telp_number = "${req.body.telp}", email = "${req.body.email}" WHERE id = "${req.params.id}"`)
  res.redirect("/home/contacts")
})
//delete record
app.get("/home/contacts/delete/:id", function(req, res) {
  db.run(`DELETE FROM Contacts WHERE id = "${req.params.id}"`)
  res.redirect("/home/contacts")
})
//====================================


//============HOMEPAGE================

app.get("/home", function(req, res) {
  res.render("index")
})
app.get("/", function(req, res) {
  // res.render("index")
  res.redirect("/home")
})
//=====================================


//==============Adresses===============

app.get("/home/adresses",function(req, res) {
  db.all(`SELECT * FROM Adresses`,function(err, db_Adresses) {
    db.all(`SELECT * FROM Contacts`, function(err, db_Contacts) {
      for(let i = 0; i < db_Adresses.length; i++){
        for (var j = 0; j < db_Contacts.length; j++) {
          // console.log(db_Adresses);
          if(db_Adresses[i].contact_id == db_Contacts[j].id){

            db_Adresses[i].name = db_Contacts[j].name
          }
        }
      }
        res.render("adresses",{ data_adresses : db_Adresses})
    })
  })
})

app.get("/home/adresses/add", function(req, res) {
  db.all(`SELECT * FROM Contacts`, function(err, db_Contacts){
    res.render("adresses-form", {data_contacts : db_Contacts})
  })

})

app.post("/home/adresses/add",function(req, res) {
  db.run(`INSERT INTO Adresses(jalan, kota, provinsi, contact_id)
  VALUES ("${req.body.jalan}", "${req.body.kota}", "${req.body.provinsi}", "${req.body.contact_id}")`,function(err, solved) {
    if(!err){
      res.redirect("/home/adresses")
    }else{
      res.send("User Sudah Dipakai")
    }
  })
})

app.get("/home/adresses/edit/:id", function(req, res) {
  db.all(`SELECT * FROM Adresses WHERE id = "${req.params.id}"`, function(err, db_Adresses) {
    db.all(`SELECT * FROM Contacts`, function(err, db_Contacts) {
      res.render("adresses-edit", {data_adresses : db_Adresses[0], data_contacts : db_Contacts})
    })
  })
})
app.post("/home/adresses/edit/:id",function(req, res) {
  db.run(`UPDATE Adresses SET
    jalan = "${req.body.jalan}",
    kota = "${req.body.kota}",
    provinsi = "${req.body.provinsi}", contact_id = "${req.body.contact_id}"
    WHERE id = "${req.params.id}"`,function(err, solved) {
      if(!err){
        res.redirect("/home/adresses")
      }else{
        res.send("User Sudah Dipakai")
      }
  })
})
app.get("/home/adresses/delete/:id", function(req, res) {
  db.run(`DELETE FROM Adresses WHERE id = "${req.params.id}"`)
  res.redirect("/home/adresses")
})

//=====================================


app.listen(3001)
