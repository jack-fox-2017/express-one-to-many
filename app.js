const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));

//routing
let index = require('./routes/index')
let contacts = require('./routes/contacts')
let addresses = require('./routes/addresses')

app.use('/', index)
app.use('/contacts', contacts)
app.use('/addresses', addresses)

app.listen(3000, () => {
  console.log("Listenin on port 3000");
})
