const express = require('express')
const router = express.Router()
const setup = require('../models/DbModel')
const address = require('../models/address')

var add = new address('./db/data.db')
var db = new setup('./db/data.db');




// LIST
router.get('/', function (req, res) {
  add.getAddress(db.connection, function (err, rowsP, rowsC) {
    if (!err) {
      res.render('addresses', {
        dataAddresses: rowsP,
        dataContact: rowsC
      })
    }
  })
})

// ADD
router.post('/', function (req, res) {
  add.addAddress(db.connection, req.body.alamat, req.body.kodepos, req.body.drop)
  res.redirect('/addresses')
})

//EDIT PAGE
router.get('/editA/:id', function (req, res) {
  add.getAddressE(db.connection, req.params.id, function (err, rowsP, rowsC) {
    if (!err) {
      res.render('editA', {
        dataAddresses: rowsP,
        dataContact: rowsC
      })
    }
  })
})

// EDIT
router.post('/editA/:id', function (req, res) {
  // console.log(req.body);
  add.updateAddress(db.connection, req.body.alamat, req.body.kodepos, req.body.drop, req.params.id)
  res.redirect('/addresses')
})

//DELETE
router.get('/delete/:id', function (req, res) {
  add.deleteAddress(db.connection, req.params.id)
  res.redirect('/addresses')
})



module.exports = router
