const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/data.db')

app.use(bodyParser.urlencoded({
  extended:true
}));

app.set('view engine', 'ejs');

//---------------------------INDEX-------------------------------
app.get('/', function(req,res){
res.render('index')
})

//---------------------------CONTACT-----------------------------

app.get('/contacts', function(req, res){
  db.all(`SELECT * FROM contacts`, function(err, rows){
    if(err){
      res.send('Ada yang salah Fren....')
    }
    else{
      res.render('contacts',{data:rows})
    }
  })
})

app.post('/contacts', function(req,res){
  db.run(`INSERT INTO contacts(id,name,company,telp_number,email)
          VALUES('${req.body.name}',${req.body.company}',
          '${req.body.telp_number}','${req.body.email}')`)
})

app.get('/contacts/edit/:contact_id', function(req, res){
  db.all(`SELECT * FROM contacts WHERE contact_id =${req.params.id}`)
    if(err){
      res.send('Ada yang salah Fren....')
    }
    else{
      res.render('editcontacts',{data:rows})
    }
  })

app.post('/contacts/edit/:contact_id', function(req,res){
  db.run(`UPDATE contacts SET name ='${req.body.name}',
        '${req.body.company}','${req.body.telp_number}',
        '${req.body.email}'WHERE contact_id='${req.params.id}'`)
  res.redirect('/contacts')
})

app.get('/contacts/delete/:contact_id', function(req, res){
  db.run(`DELETE FROM contacts WHERE contact_id='${req.params.id}'`)
  res.redirect('/contacts')
})

//----------------------------------ADDRESS----------------------------------------------

app.get('/address', function(req,res){
  db.all(`SELECT * FROM addresses`, function(err,rows){
    if(!err){
      res.render('address',{data: rows})
    }
  })
})

app.post('/address', function(req,res){
  db.run(`INSERT INTO addresses(street,city,zip_code,contact_id)
          VALUES('${req.body.street}',
                 '${req.body.city}',
                 '${req.body.zip_code}',
                 '${req.body.contact_id}'
                  )`)
  res.redirect('/address')
})

app.get('/address/edit/:id', function(req,res){
  db.each(`SELECT * FROM addresses WHERE id = ${req.params.id}`, function(err,rows){
    if(!err){
      res.render('editaddress',{data: rows})
    }
  })
})

app.post('/address/edit/:id', function(req,res){
  db.run(`UPDATE addresses SET street='${req.body.street}',
  cuty='${req.body.city}',
  zip_code='${req.body.zip_code}',
  contact_id=${req.body.contact_id}
  WHERE id=${req.params.id}`)
  res.redirect('/address')
})


app.get('/address/delete/:id', function(req,res){
  db.run(`DELETE FROM addresses WHERE id=${req.params.id}`)
  res.redirect('/address')
})


//------------------------------------------------------------------------


app.listen(3000, function(){
  console.log("Port 3000 on my way");
});
