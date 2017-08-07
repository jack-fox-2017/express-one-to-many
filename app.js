const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

//router
var routeContact = require('./router/contact')
var routeGroup = require('./router/group')
var routeProfile = require('./router/profile')
var routeAddress = require('./router/address')


//intiatior
// var db = new setup('./db/data.db');
var app = express();



app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))


app.use('/contacts', routeContact);
app.use('/groups', routeGroup);
app.use('/profiles', routeProfile);
app.use('/addresses', routeAddress);



app.get('/', function (req, res) {
  res.render('index', {
    title: 'WELCOME'
  })
})

app.listen(3000);
