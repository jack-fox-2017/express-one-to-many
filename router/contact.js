const express = require('express')
const router = express.Router()
const setup = require('../models/DbModel')
const contact = require('../models/contact')

var cont = new contact('./db/data.db')
var db = new setup('./db/data.db');



// LIST
router.get('/', function (req, res) {
  cont.getContact(db.connection, function (err, rows) {
    if (!err) {
      // res.send(rows)
      res.render('contacts', {
        data: rows
      })
    }
  })
})

// ADD
router.post('/', function (req, res) {
  cont.addContact(db.connection, req.body.nama, req.body.corp, req.body.phone, req.body.email)
  res.redirect('/contacts')
})

//EDIT PAGE
router.get('/edit/:id', function (req, res) {
  cont.getContactE(db.connection, req.params.id, function (err, rows) {
    if (!err) {
      res.render('edit', {
        data: rows,
      })
    }
  })
})

// EDIT
router.post('/edit/:id', function (req, res) {
  // console.log(req.body);
  cont.updateContact(db.connection, req.body.nama, req.body.corp, req.body.phone, req.body.email, req.params.id)
  res.redirect('/contacts')
})

//DELETE
router.get('/delete/:id', function (req, res) {
  cont.deleteContact(db.connection, req.params.id)
  res.redirect('/contacts')
})




module.exports = router
