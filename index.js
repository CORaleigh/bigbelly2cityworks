var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
const Rx = require('rx');
const requests_ = new Rx.Subject();
var request = require('request');

var srPostBody = JSON.stringify({"callerFirstName": "Surender","callerLastName": "Dalal", "callerWorkPhone": "9196708062", "callerEmail": 
"surender.dalal@raleighnc.gov ", "problemSid": "263574", "x": "", "y": "", "details": "this is a test", "submitTo": 293626,
 "callerAddress":"726 davenbury way", "callerCity":"cary" , "callerState":"NC" , "callerZip":"27513" });
 
var options = {
    method: 'POST',
    url: 'http://rhsoatstapp1.ci.raleigh.nc.us:8182/RaleighAPI/cityworks/createServiceRequest/',
    // url: 'https://maps.raleighnc.gov/arcgis/rest/services/Addresses/MapServer/0/query?where=ADDRESSU+like+%27720+N%25+PERSON+ST%25%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson',
    headers: {
        'Content-Type': 'application/json'
    },
    body: srPostBody
};

// Example of a POST method
function createServiceRequest(e) {
  var source = Rx.Observable.create(function(observer) {
      request(options, function(error, response, body) {
          if (error) { observer.onError(); } else { observer.onNext({ response: response, body: body }); }
          observer.onCompleted();
      });
  });

  source.subscribe(function(x) {
          var jsonObject = JSON.parse(x.body);
          var jsonStr = JSON.stringify(jsonObject.requestId);
          console.log('Next: ' + jsonStr);
          e.res.end(jsonStr);
      },
      function(err) {
          console.log('Error in createServiceRequest: ' + err);
      },
      function() {
          console.log('Completed');
      });
}
app.use(bodyParser.json());

app.get('/', function (req, res) {
   res.send('Hello World!');
  
});

app.get('/getbigbelly', function(req,res) {
  console.log('request = ', req);
  res.send('hi world' + req);
});

app.post('/geoeventlogger', function (req, res) {
  console.log('reqbody - ', req.body);
  let results = null;
  var res_data = '';
  var assets = [];
  this.assets = req.body.assets;  
  console.log('assets - ', this.assets);
  if (req.body.assets[0] != null) {
  	this.assets.forEach((item) => {
	  this.results = JSON.parse(item);
	     if (this.results.latestFullness == "20 Percent") {
			console.log('create a Service Request');
	     }
 	});
  }
  
//   console.log('res_data = ', res_data.assets[0]);
//   console.log('res_data = ', res_data.assets[0].latestFullness);
//   console.log('request = ', req.body.assets[0].latestFullness);

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
