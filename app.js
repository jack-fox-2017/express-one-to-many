const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.set('view engine', 'ejs');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./db/data.db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//=============USERS=============//
//home page
app.get('/home', function(req, res){
  res.render('home')
});

//users page
app.get('/users', function(req, res){
  db.all(`SELECT * FROM Users`, function(err, rows){
    res.render('users', {dataUsers: rows})
  })
})

//users add form page
app.get('/users/add', function(req, res){
  res.render('user-add-form')
})

//users add data users
app.post('/users/add', function(req, res){
  db.run(`INSERT INTO Users (username, firstname, lastname, email)
  VALUES ('${req.body.username}', '${req.body.firstname}',
  '${req.body.lastname}', '${req.body.email}')`)
  res.redirect('/users')
})

//user edit form page
app.get('/users/edit/:id', function(req, res){
  db.all(`SELECT * FROM Users WHERE id = ${req.params.id}`, function(err, rows){
    res.render('user-edit-form', {dataUsers: rows[0]})
  })
})

//user edit users
app.post('/users/edit/:id', function(req, res){
  db.run(`UPDATE Users SET username = '${req.body.username}', firstname = '${req.body.firstname}',
  lastname = '${req.body.lastname}', email = '${req.body.email}' WHERE id = ${req.params.id}`)
  res.redirect('/users')
})

//delete data users
app.get('/users/delete/:id', function(req, res){
  db.run(`DELETE FROM Users WHERE id = ${req.params.id}`)
  res.redirect('/users')
})

//==============PROFILES================//

//profile home page
app.get('/address', function(req, res){

  db.all(`SELECT * FROM Address`, function(err, rows){

      db.all(`SELECT * FROM Users `, function(err, rows2){

        for(let i=0; i<rows.length; i++)
        {
          for(let j=0; j<rows2.length; j++)
          {
            if(rows[i].user_id == rows2[j].id)
            {
              rows[i].username = rows2[j].username
            }
          }
        }
        res.render('address', {dataAddress:rows})
    })
  })
})

//profile add form page
app.get('/address/add',function(req, res){
  db.all(`SELECT * FROM Users`, function(err, dataUsers){
    res.render('address-add-form', {dataUsers:dataUsers})
  })
})

//profiles add data profiles
app.post('/profiles/add', function(req, res){
  db.run(`INSERT INTO Address (street, city, zipcode, user_id)
  VALUES ('${req.body.street}', '${req.body.city}', '${req.body.zipcode}',
  '${req.body.user_id}')`, function(err, solved){
    if(!err)
    {
      res.redirect('/address')
    }
    else {
      res.send('Data telah di pakai')
    }
  })
})

//user edit form page
app.get('/address/edit/:id', function(req, res){
  db.all(`SELECT * FROM Address WHERE id = ${req.params.id}`, function(err, rows){
    db.all(`SELECT * FROM Users`, function(err, rows1){
      res.render('address-edit-form', {dataAddress:rows, dataUsers:rows1})
    })
  })
})

//user edit users
app.post('/address/edit/:id', function(req, res){
  db.run(`UPDATE Address SET street = '${req.body.street}', city = '${req.body.city}',
  zipcode = '${req.body.zipcode}', user_id = '${req.body.user_id}' WHERE id = ${req.params.id}`)
  res.redirect('/address')
})

app.get('/address/delete/:id', function(req, res){
  db.run(`DELETE FROM Address WHERE id= ${req.params.id}`)
  res.redirect('/address')
})


app.listen(3000);
