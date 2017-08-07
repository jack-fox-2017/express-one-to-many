var express = require ('express');
var path = require ('path');
var app = express()
var bodyParser = require ('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.set('view engine', 'ejs');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

app.get ('/', function (req, res){
  res.render ('index')
})

app.get ('/contacts', function(req, res){
db.all ('SELECT * FROM contacts',function (err, datas) {
  res.render('contacts', {contact: datas})
  })
})

app.post ('/contacts', function(req,res){
  db.run(`INSERT INTO contacts(name,company,telp_number,email) VALUES ('${req.body.Name}','${req.body.Company}','${req.body.Telephone}','${req.body.Email}');`)
  res.redirect(`/contacts`)
})

app.get ('/contacts/delete/:id', function (req, res) {
  db.run(`DELETE FROM contacts WHERE id = ${req.params.id}`)
  res.redirect(`/contacts`)
})

app.get ('/contacts/edit/:id', function (req, res){
  console.log(`SELECT * FROM contacts WHERE id = ${req.params.id}`);
  db.all(`SELECT * FROM contacts WHERE id = ${req.params.id}`, function (err, rows){
    if (!err) {
      console.log(rows);
      res.render(`edit`, {input : rows})
    }
  })
})

app.post ('/contacts/edit/:id' , function(req, res){
  db.run(`UPDATE contacts SET name = '${req.body.Name}', company = '${req.body.Company}', telp_number = '${req.body.Telephone}', email = '${req.body.Email}' WHERE id = '${req.params.id}'`)
  res.redirect(`/contacts`)
})

app.get ('/address', function(req, res){
db.all ('SELECT * FROM address',function (err, datas) {
  db.all ('SELECT * FROM contacts', function (err, rows) {
    res.render('address', {address: datas, kontak:rows})
  })

  })
})

app.post ('/address', function(req,res){
  db.run(`INSERT INTO address (postal_code, street, city, contacts_id) VALUES ('${req.body.postal_code}','${req.body.street}','${req.body.city}',${req.body.contacts_id});`)
  res.redirect(`/address`)
})

app.get ('/address/delete/:id', function (req, res) {
  db.run(`DELETE FROM address WHERE id = ${req.params.id}`)
  res.redirect(`/address`)
})

app.get ('/address/editaddress/:id', function (req, res){
  console.log(`SELECT * FROM address WHERE id = ${req.params.id}`);
  db.all(`SELECT * FROM address WHERE id = ${req.params.id}`, function (err, rows){
    if (!err) {
      console.log(rows);
      res.render(`editaddress`, {input : rows})
    }
  })
})

app.post ('/address/editaddress/:id' , function(req, res){
  db.run(`UPDATE address SET postal_code = '${req.body.postal_code}', city = '${req.body.city}', street = '${req.body.street}' WHERE id = '${req.params.id}'`)
  res.redirect(`/address`)
})


app.listen(3000)
