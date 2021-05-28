var express = require('express');
var app = express();

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/json', (req, res) => {
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    res.json({ "message": "HELLO JSON" })
  } else {
    res.json({ "message": "Hello json" })
  }
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
},
(req, res) => {
  res.send({time: req.time})
});

app.get('/:word/echo', (req, res) => {
  const { word } = req.params;
  res.json({ echo: word});
});

app.get('/name', (req, res) => {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR
  // var { first: firstName, last: lastName = req.query; }
  res.json({
    name: `${firstName} ${lastName}`
  });
});

/* const middleware = (req, res, next) => {
  req.time = new Date().toString();
  next();
};

app.get("/now", middleware, (req, res) => {
  res.send({
    time: req.time
  });
}); */

/* function logOriginalUrl(req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod(req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

var logStuff = [logOriginalUrl, logMethod]
app.get('/user/:id', logStuff, function(req, res, next) {
  res.send('User Info')
}) */































module.exports = app;
