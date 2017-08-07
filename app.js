const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./db/data.db')

app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))




app.get('/', (req, res) => {
  res.render('index')
})



// ----------------------------------CONTACTS---------------------------------------

app.get('/contacts', (req, res) => {
  db.all(`SELECT * FROM Contacts`, (err, rows) => {
    if (!err) {
      res.render('contacts', {data: rows})
    }
  })
})

app.post('/contacts', (req, res) => {
  // res.send('post contacts!')
  db.run(`INSERT INTO Contacts (name, company, phone, email) VALUES ('${req.body.name}', '${req.body.company}', '${req.body.phone}', '${req.body.email}')`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:id', (req, res) => {
  db.run(`DELETE FROM Contacts WHERE id = ${req.params.id}`)
  res.redirect('/contacts')
})

app.get('/contacts/edit/:id', (req, res) => {
  db.all(`SELECT * FROM Contacts WHERE id=${req.params.id}`, (err, rows) => {
    if (!err) {
      res.render('contacts_edit', {data: rows})
      // res.send(rows)
    }
  })
})

app.post('/contacts/edit/:id', (req, res) => {
  db.run(`UPDATE Contacts SET name='${req.body.name}', company='${req.body.company}', phone='${req.body.phone}', email='${req.body.email}' WHERE id=${req.params.id}`)
  res.redirect('/contacts')
})




// ----------------------------------ADDRESSES---------------------------------------

app.get('/addresses', (req, res) => {
  db.all(`SELECT * FROM Addresses`, (err, dataAddresses) => {
    db.all(`SELECT * FROM Contacts`, (err2, dataContacts) => {
      for (let i=0; i<dataAddresses.length; i++) {
        for (let j=0; j<dataContacts.length; j++) {
          if (dataAddresses[i].ContactId == dataContacts[j].id) {
            dataAddresses[i].name = dataContacts[j].name
          }
        }
      }
      res.render('addresses', {data: dataAddresses, data2: dataContacts})
    })
  })
})

app.post('/addresses', (req, res) => {
  db.run(`INSERT INTO Addresses (street, city, zip_code, ContactId) VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zip}', ${req.body.contactId})`)
  res.redirect('/addresses')
})

app.get('/addresses/delete/:id', (req, res) => {
  db.run(`DELETE FROM Addresses WHERE id = '${req.params.id}';`)
  res.redirect('/addresses')
})

app.get('/addresses/edit/:id', (req,res) => {
  db.all(`SELECT * FROM Addresses WHERE id = '${req.params.id}';`, (err, data) => {
    db.all(`SELECT * FROM Contacts;`, (err, data2) => {
      res.render('addresses_edit', {data: data, data2: data2})
    })
  })
})

app.post('/addresses/edit/:id', (req, res) => {
  db.run(`UPDATE Addresses SET street='${req.body.street}', city='${req.body.city}', ContactId = ${req.body.contactId} WHERE id = ${req.params.id}`)
  res.redirect('/addresses')
})






app.listen(3000)
