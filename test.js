const express = require('express');
const hbs = require('hbs');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var {mongoose} = require('./server/db/mongoose');
var {peopleData} = require('./server/models/peopleData');

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');

var app = express();
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({"extended":true}));

var now = new Date().toString();

app.get('/',(req,res) =>{
  res.send('app working');
});

app.post('/', (req, res) => {
  var name = req.body.uname;
  var password = req.body.psw;

  peopleData.find({"name":name}).then((user) => {
    console.log("user.length: ",user.length);
    if(user.length===0){
      res.send("Utente non trovato");
    } else {
      if(user[0].password===password){
        res.render('index.hbs',{
          pageTitle: "pagina index",
          headerText: "Template header",
          pageCSS: "style.css",
          bodyText: `Benvenuto utente:${user[0].name}, la tua password è: ${user[0].password}`,
          company: "Lombardini22"
        });
      } else {
        res.send("Password errata");
      };
    };
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/login', function (req, res) {
  res.render('login.hbs',{});
});

app.get('/peopleData', function (req, res) {
  peopleData.find().then((users) => {
    res.send({
      users:users,
      count:users.length
    });
  }, (e)=>{
    res.status(400).send(e);
  });
});

//definizione di una proprietà ed invio del parametro tramite GET request
app.get('/peopleData/:id', function (req, res) {
  //res.send(req.params);

  var id = req.params.id;
  //Verifico se il parametro è un valido object ID di MongoDB
  if(!ObjectID.isValid(id)){
    return res.status(404).send('not valid MongoDB ID')
  };

  peopleData.findById(id)
  .then((doc) => {
    if(!doc){ return res.status(404).send('ID not found in Collection')}
    res.send(doc)
  })
  .catch((e)=>{ res.status(400).send('Bad Request') });
});


app.get('/adduser', function (req, res) {
  res.render('adduser.hbs',{});
});

app.post('/test', function (req, res) {
  var userList = req.body.userlist.split(";");
  var userArray = [];

  userList.forEach(function(e){
    var thisUser = new peopleData({
      name:e.split(",")[0],
      email:e.split(",")[1],
      password:"lombardini"
    });
    thisUser.save();
    userArray.push(thisUser);
  });

  res.send(userArray);
});

app.listen(port, () => {
  console.log('Server is running on http://localhost:'+port);
});
