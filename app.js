const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()

var db = new sqlite3.Database('./db/data.db')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.get('/', function(req,res) {
  // res.send('hello')
  res.render('index')
})

//-----------CONTACTS-----------

app.get('/contacts', (req,res) => {
  db.all(`SELECT * FROM Contacts`, (err, contact) => {
    if(!err) {
      // console.log(contact);
      res.render('contacts', {ctc: contact})
    }
  })
})

app.post('/contacts', (req,res) => {
  db.run(`INSERT INTO Contacts (name, company, telp_number, email)
          VALUES ('${req.body.name}', '${req.body.company}', '${req.body.telp_number}', '${req.body.email}')`)
    // if(!err) {
  res.redirect('/contacts')
    // }
    // console.log('berhasil tambah data');
})

app.get('/contacts/edit/:id', (req,res) => {
  db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, (err, contact) => {
    if(!err) {
      res.render('edit-contact', {ctc: contact})
    }
  })
})

app.post('/contacts/edit/:id', (req,res) => {
  db.run(`UPDATE Contacts
          SET name='${req.body.name}',company='${req.body.company}',telp_number='${req.body.telp_number}',email='${req.body.email}'
          WHERE id=${req.params.id}`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', (req,res) => {
  db.run(`DELETE FROM Contacts WHERE id=${req.params.id}`)
  res.redirect('/contacts')
})


//-----------ADDRESSES-----------

app.get('/addresses', (req,res) => {
  db.all(`SELECT * FROM Addresses`, (err, address) => {
    db.all(`SELECT id,name FROM Contacts`, (err2, contact) => {
      if(!err) {
        for(let i = 0; i < address.length; i++){
            for (let j = 0; j < contact.length; j++) {
              if(address[i].contact_id == contact[j].id){
                address[i].name = contact[j].name
              }
            }
          }
        // console.log(contact);
        res.render('addresses', {adr: address, ctc: contact})
      }
    })
  })
})

app.post('/addresses', (req,res) => {
  db.run(`INSERT INTO Addresses (street, city, zip, contact_id)
          VALUES ('${req.body.street}','${req.body.city}','${req.body.zip}','${req.body.contact_id}')`)
    // if(!err) {
  res.redirect('/addresses')
    // }
    // console.log('berhasil tambah data');
})

app.get('/addresses/edit/:id', (req,res) => {
  db.all(`SELECT * FROM Addresses WHERE id = ${req.params.id}`, (err, address) => {
    db.all(`SELECT id,name FROM Contacts`, (err2, contact) => {
      if(!err) {
        res.render('edit-address', {adr: address[0], ctc: contact})
      }
    })
  })
})

app.post('/addresses/edit/:id', (req,res) => {
  db.run(`UPDATE Addresses
          SET street='${req.body.street}',city='${req.body.city}',zip='${req.body.zip}',contact_id='${req.body.contact_id}'
          WHERE id=${req.params.id}`)
  res.redirect('/addresses')
})

app.get('/addresses/delete/:id', (req,res) => {
  db.run(`DELETE FROM Addresses WHERE id=${req.params.id}`)
  res.redirect('/addresses')
})

app.get('/addresses_with_contact/:id', (req,res) => {
  db.all(`SELECT * FROM Addresses`, (err, address) => {
    db.all(`SELECT id,name FROM Contacts`, (err2, contact) => {
      if(!err) {
        // console.log(contact);
        res.render('addresses_with_contact', {adr: address, ctc: contact})
      }
    })
  })
})

app.listen(3000, function() {
  console.log('I am listening port 3000');
})
