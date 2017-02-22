var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var swig = require('swig');
var logger= require('express-logger');
var mailer = require('express-mailer');
var path = require('path');


app.use(logger({path:"/index.html"}));//verification popentiel erreur
app.use(bodyParser());//recuperation data envoyer par le formulaire
app.use(express.static(path.join(__dirname + '/public')));//recuperer fichier static html,css...
app.engine('html', swig.renderFile);
app.set('views', __dirname +'/views');
app.set('view engine', 'html');

app.get('/', function(req, res){
  res.render('index');
});

app.post('/contact', function(req, res, next){
///////////////////////////////////////////////////////
  mailer.extend(app, {
    from: req.body.email,
    host: 'smtp.free.fr',
    secureConnection: false,
    port: 25,
    transportMethod: 'SMTP'
  });
////////////////////////////////////////////////////////
  app.mailer.send('email', {
    to: 'elbayass59@gmail.com',
    subject: req.body.subject,
    message: req.body.message
  }, function(err){
    if(err){
      console.log('On a une erreur!');return;
    }
    res.send('Email envoyé');
  });
});


app.listen(8080);
console.log('app is running');
