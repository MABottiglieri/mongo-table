const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./server/db/mongoose');
var {clients} = require('./server/models/clients');
var {campains} = require('./server/models/campains');
var {urls} = require('./server/models/urls');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({"extended":true}));

app.get('/start',(req,res) =>{
  res.render('index.hbs',{
    pageTitle: "data table"
  });
});

app.get('/clients', function (req, res) {
  clients.find().then((docs) => {
    res.send({
      docs:docs,
      count:docs.length
    });
  }, (e)=>{
    res.status(400).send(e);
  })
  .catch((e)=>{ res.status(400).send('Bad Request') });
});
app.get('/campains', function (req, res) {
  campains.find().then((docs) => {
    res.send({
      docs:docs,
      count:docs.length
    });
  }, (e)=>{
    res.status(400).send(e);
  });
});
app.get('/urls', function (req, res) {
  urls.find().then((docs) => {
    res.send({
      docs:docs,
      count:docs.length
    });
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:'+port);
});

//parametric collections
// app.get('/:collection', function (req, res) {
//   //res.send(req.params);
//   var collection = req.params.collection;
//   (collection).find().then((docs) => {
//     res.send({
//       docs:docs,
//       count:docs.length
//     });
//   }, (e)=>{
//     res.status(400).send(e);
//   })
//   .catch((e)=>{ res.status(400).send('Bad Request') });
// });
//collections
