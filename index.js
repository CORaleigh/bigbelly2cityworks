var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);


app.use(bodyParser.json());

app.get('/', function (req, res) {
   res.send('Hello World!');
  
});

app.get('/getbigbelly', function(req,res) {
  console.log('request = ', req);
  res.send('hi world' + req);
});

app.post('/bigbelly', function(req,res) {
  // const res_data = JSON.parse(req.body);
  console.log('request = ', req.body);
  res.send('inside app.post');
});

// app.listen(3000, function () {
//   console.log('app listening on port 3000');
// });

  // Start listening with socket.io
  io.on('connection', function(socket){
    console.log('a user connected');
  });


http.listen(3001, function(){
  console.log('http listening on port:3001');
});