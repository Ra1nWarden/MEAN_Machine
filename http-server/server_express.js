var express = require('express');
var app = express();
var path = require('path');
var adminRouter = express.Router();

adminRouter.get('/', function(req, res) {
  res.send('I am the dashboard!');
});

adminRouter.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

adminRouter.get('/users', function(req, res) {
  res.send('I show all the users!');
});

adminRouter.param('name', function(req, res, next, name) {
  console.log('doing name validation on ' + name);
  req.name = name;
  next();
});

adminRouter.get('/user/:name', function(req, res) {
  res.send('hello ' + req.name + '!');
});

adminRouter.get('/posts', function(req, res) {
  res.send('I show all the posts');
});

app.use('/admin', adminRouter);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.route('/login')
  .get(function(req, res) {
    res.send('this is login form');
  })
  .post(function(req, res) {
    console.log('processing');
    res.send('processing the login form!');
  });

app.listen(1337);
console.log('Starting express server at 1337');
