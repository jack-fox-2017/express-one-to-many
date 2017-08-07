const express = require('express')
const router = express.Router()
const setup = require('../models/DbModel')
const profile = require('../models/profile')

var prof = new profile('./db/data.db')
var db = new setup('./db/data.db');


// LIST
router.get('/', function (req, res) {
  prof.getProfile(db.connection, function (err, rowsP, rowsC) {
    if (!err) {
      res.render('profiles', {
        dataP: rowsP,
        dataContact: rowsC
      })
    }
  })
})

// ADD
router.post('/', function (req, res) {
  prof.addProfile(db.connection, req.body.user, req.body.drop)
  res.redirect('/profiles')
})

//EDIT PAGE
router.get('/editP/:id', function (req, res) {
  prof.getProfileE(db.connection, req.params.id, function (err, rowsP, rowsC) {
    if (!err) {
      res.render('editP', {
        dataProfile: rowsP,
        dataContact: rowsC
      })
    }
  })
})

// EDIT
router.post('/editP/:id', function (req, res) {
  // console.log(req.body);
  prof.updateProfile(db.connection, req.body.user, req.body.drop, req.params.id)
  res.redirect('/profiles')
})

//DELETE
router.get('/delete/:id', function (req, res) {
  prof.deleteProfile(db.connection, req.params.id)
  res.redirect('/profiles')
})


module.exports = router
