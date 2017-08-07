//require
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sql = require('sqlite3').verbose();

let db = new sql.Database('./db/data.db'); //instances sql db with parameter: path of db file

app.use(bodyParser.json()); //use bodyParser
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs'); //set views directory with ejs file inside

//index
app.get('/', (req,res) => {
  res.render('index');
});

//users: show all users data
app.get('/users', (req, res)=>{
  let qry_showUsers = `SELECT * FROM Users`;
  db.all(qry_showUsers, (err, rows)=>{
    if (err)
      res.render('users', {data:err});
    else
      res.render('users',{data:rows});
  });
});

//users: insert user data
app.post('/users', (req, res)=>{
  let qry_InsertUser = `INSERT INTO Users (username, firstname, lastname, email) VALUES (
    '${req.body.username}',
    '${req.body.firstname}',
    '${req.body.lastname}',
    '${req.body.email}')`;
  db.run(qry_InsertUser);
  res.redirect('/users');
});

//users: get/show user data
app.get('/users/edit/:id', (req, res)=>{
  let qry_showUser = `SELECT * FROM Users WHERE id=${req.params.id}`;
  db.all(qry_showUser, (err, row)=>{
    if (err)
      res.render('edit-user', {data:err});
    else
      res.render('edit-user', {data:row[0]});
  });
});

//users: update user data
app.post('/users/edit/:id', (req,res)=>{
  let qry_updateUser = `UPDATE Users SET
    username='${req.body.username}',
    firstname='${req.body.firstname}',
    lastname='${req.body.lastname}',
    email='${req.body.email}'
    WHERE id=${req.params.id}`;
  db.run(qry_updateUser);
  res.redirect('/users');
});

//users: delete user data
app.get('/users/delete/:id', (req, res)=>{
  let qry_delUser = `DELETE FROM Users WHERE id=${req.params.id}`;
  db.run(qry_delUser);
  res.redirect('/users');
});

//profiles: show all profiles data
app.get('/profiles', (req, res)=>{
  let qry_ShowProfiles = `SELECT * FROM Profiles`;
  let qry_showUsers = `SELECT * FROM Users`;
  db.all(qry_ShowProfiles, (err, rowProfile)=>{
    if(err)
      res.render('profiles', {dataProfiles:err});
    else
    db.all(qry_showUsers, (err, rowUser)=>{
      if (err)
        res.render('profiles', {dataUsers:err});
      else
        res.render('profiles',{dataUsers:rowUser, dataProfiles:rowProfile});
    });
  });
});

//profiles: insert profile data
app.post('/profiles', (req, res)=>{
  let qry_InsertProfile = `INSERT INTO Profiles (hometown, birth_year, relationship_status, users_id) VALUES
    ('${req.body.hometown}',${req.body.birth_year},'${req.body.relationship_status}', ${req.body.users_id})`;
  db.run(qry_InsertProfile, (err)=>{
    if(err)
      res.send(err.toString());
    else
      res.redirect('/profiles');
  });
});

//profiles: get/show profile data
app.get('/profiles/edit/:id', (req, res)=>{
  let qry_showProfile = `SELECT * FROM Profiles WHERE id=${req.params.id}`;
  db.all(qry_showProfile, (err, rowProfile)=>{
    let qry_showUsers = `SELECT * FROM Users WHERE id=${rowProfile[0].users_id}`;
    if (err)
      res.render('edit-profile', {dataProfile:err});
    else
    db.all(qry_showUsers, (err, rowUser)=>{
      if (err)
        res.render('edit-profile', {dataUsers:err, dataProfiles:rowProfile[0]});
      else
        res.render('edit-profile',{dataUsers:rowUser[0], dataProfiles:rowProfile[0]});
    });
  });
});

//profiles: update profile data
app.post('/profiles/edit/:id', (req,res)=>{
  let qry_updateProfile = `UPDATE Profiles SET
    hometown='${req.body.hometown}',
    birth_year='${req.body.birth_year}',
    relationship_status='${req.body.relationship_status}'
    WHERE id=${req.params.id}`;
  db.run(qry_updateProfile);
  res.redirect('/profiles');
});

//profiles: delete profile data
app.get('/profiles/delete/:id', (req, res)=>{
  let qry_delProfile = `DELETE FROM Profiles WHERE id=${req.params.id}`;
  db.run(qry_delProfile);
  res.redirect('/profiles');
});

//contacts: show all contacts data
app.get('/contacts', (req, res)=>{
  let qry_showContacts = `SELECT * FROM Contacts`;
  db.all(qry_showContacts, (err, rows)=>{
    if (err)
      res.render('contacts', {data:err});
    else
      res.render('contacts',{data:rows});
  });
});

//contacts: insert contact data
app.post('/contacts', (req, res)=>{
  let qry_InsertContacts = `INSERT INTO Contacts (name, company, phone, email) VALUES (
    '${req.body.name}',
    '${req.body.company}',
    '${req.body.phone}',
    '${req.body.email}')`;
  db.run(qry_InsertContacts);
  res.redirect('/contacts');
});

//contacts: get/show contact data
app.get('/contacts/edit/:id', (req, res)=>{
  let qry_showContact = `SELECT * FROM Contacts WHERE id=${req.params.id}`;
  db.all(qry_showContact, (err, row)=>{
    if (err)
      res.render('edit-contact', {data:err});
    else
      res.render('edit-contact', {data:row[0]});
  });
});

//contacts: update contacts data
app.post('/contacts/edit/:id', (req,res)=>{
  let qry_updateContact = `UPDATE Contacts SET
    name='${req.body.name}',
    company='${req.body.company}',
    phone='${req.body.phone}',
    email='${req.body.email}'
    WHERE id=${req.params.id}`;
  db.run(qry_updateContact);
  res.redirect('/contacts');
});

//contacts: delete contacts data
app.get('/contacts/delete/:id', (req, res)=>{
  let qry_delContact = `DELETE FROM Contacts WHERE id=${req.params.id}`;
  db.run(qry_delContact);
  res.redirect('/contacts');
});

//Addresses: show all addresses data
app.get('/addresses', (req, res)=>{
  let qry_ShowAddresses = `SELECT * FROM Addresses`;
  let qry_showContacts = `SELECT * FROM Contacts`;
  db.all(qry_ShowAddresses, (err, rowAddresses)=>{
    if(err)
      res.render('addresses', {dataAddresses:err});
    else
    db.all(qry_showContacts, (err, rowContacts)=>{
      if (err)
        res.render('addresses', {dataAddresses:err, dataContacts:err});
      else
        res.render('addresses',{dataContacts:rowContacts, dataAddresses:rowAddresses});
    });
  });
});

//Addresses: insert address data
app.post('/addresses', (req, res)=>{
  let qry_InsertAddress = `INSERT INTO Addresses (street, city, zip_code, contacts_id) VALUES
    ('${req.body.street}','${req.body.city}','${req.body.zip_code}', ${req.body.contacts_id})`;
  db.run(qry_InsertAddress);
  res.redirect('/addresses');
});

//Addresses: get/show address data
app.get('/addresses/edit/:id', (req, res)=>{
  let qry_ShowAddresses = `SELECT * FROM Addresses WHERE id=${req.params.id}`;
  db.all(qry_ShowAddresses, (err, rowAddresses)=>{
    let qry_showContacts = `SELECT * FROM Contacts WHERE id=${rowAddresses[0].contacts_id}`;
    if (err)
      res.render('edit-address', {dataAddresses:err});
    else
    db.all(qry_showContacts, (err, rowContacts)=>{
      if (err)
        res.render('edit-address', {dataContacts:err, dataAddresses:rowAddresses[0]});
      else
        res.render('edit-address',{dataContacts:rowContacts[0], dataAddresses:rowAddresses[0]});
    });
  });
});

//Addresses: update address data
app.post('/addresses/edit/:id', (req,res)=>{
  let qry_updateAddress = `UPDATE Addresses SET
    street='${req.body.street}',
    city='${req.body.city}',
    zip_code='${req.body.zip_code}'
    WHERE id=${req.params.id}`;
  db.run(qry_updateAddress);
  res.redirect('/addresses');
});

//addresses: delete address data
app.get('/addresses/delete/:id', (req, res)=>{
  let qry_delAddress = `DELETE FROM Addresses WHERE id=${req.params.id}`;
  db.run(qry_delAddress);
  res.redirect('/addresses');
});

//listen to localhost:3000
app.listen(3000, ()=>{
  console.log('listening on port 3000');
});
