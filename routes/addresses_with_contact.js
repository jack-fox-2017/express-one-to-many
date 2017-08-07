const express = require('express')
let router = express.Router()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/data.db')

router.get('/', (req, res) => {
  db.all(`SELECT * FROM addresses`, (errA, rowsA) => {
    if (errA) throw errA

    db.serialize(function() {
      rowsA.forEach((item, index) => {
        rowsA[index].streets = []
        db.all(`SELECT name FROM contacts WHERE id=${item.contact_id}`, (err, rows) => {
          rowsA[index].name = rows.map(x => {return x.name})
        })
      })

      db.all(`SELECT id, name FROM contacts`, (errC, rowsC) => {
        res.render('addresses_with_contact', {
          data: rowsA,
          contacts: rowsC
        })
      })
    })
  })
})

// router.post('/', (req, res) => {
//   db.run(`INSERT INTO addresses (street, city, province, zip, contact_id) VALUES (
//     '${req.body.street}',
//     '${req.body.city}',
//     '${req.body.province}',
//     '${req.body.zip}',
//     ${req.body.contact_id == '' ? null : req.body.contact_id}
//   )`, (err, rows) => {
//     if (err) throw err
//     res.redirect('/addresses')
//   })
// })

// router.get('/edit/:id', (req, res) => {
//   db.all(`
//     SELECT
//       addresses.*,
//       contacts.name as contact_name

//       FROM addresses
//         LEFT JOIN contacts
//           ON contacts.id = addresses.contact_id
//             WHERE addresses.id = ${req.params.id}
//   `, (errA, rowsA) => {
//     if (errA) throw errA
//     db.all(`SELECT id, name FROM contacts`, (errC, rowsC) => {
//       res.render('addresses-edit', {
//         data: rowsA,
//         contacts: rowsC
//       })
//     })
//   })
// })

// router.post('/edit/:id', (req, res) => {
//   db.run(`UPDATE addresses SET
//     street = '${req.body.street}',
//     city = '${req.body.city}',
//     province = '${req.body.province}',
//     zip = '${req.body.zip}',
//     contact_id = ${req.body.contact_id == '' ? null : req.body.contact_id}
//   WHERE id = ${req.params.id}`)

//   res.redirect('/addresses')
// })

// router.get('/delete/:id', (req, res) => {
//   db.run(`DELETE FROM addresses WHERE id = ${req.params.id}`)
//   res.redirect('/addresses')
// })

module.exports = router
