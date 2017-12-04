var express = require("express");
var app = express();
var http = require("http").Server(app);
var bodyParser = require("body-parser");
var io = require("socket.io")(http);
// const Rx = require("rx");
// const requests_ = new Rx.Subject();
var request = require("request-promise");

var srPostBody = {
  callerFirstName: "Surender",
  callerLastName: "Dalal",
  callerWorkPhone: "9196708062",
  callerEmail: "surender.dalal@raleighnc.gov ",
  problemSid: "263574",
  x: "",
  y: "",
  details: "this is a test",
  submitTo: 293626,
  callerAddress: "726 davenbury way",
  callerCity: "cary",
  callerState: "NC",
  callerZip: "27513"
};

var options = {
  method: "POST",
  url:
    "http://rhsoatstapp1.ci.raleigh.nc.us:8182/RaleighAPI/cityworks/createServiceRequest/",
  // url: 'https://maps.raleighnc.gov/arcgis/rest/services/Addresses/MapServer/0/query?where=ADDRESSU+like+%27720+N%25+PERSON+ST%25%27&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=5&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson',
  headers: {
    "Content-Type": "application/json"
  },
  body: srPostBody,
  json: true
};

// Example of a POST method
function createServiceRequest() {
	request(options).then(function (response) {     
	    // Handle the response
	   console.log('response is ', response);
	  }).catch(function (err) {     
	    // Deal with the error 
	    console.log('error is ', err);
	});
}
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World!");
});

app.get("/getbigbelly", function(req, res) {
  console.log("request = ", req);
  res.send("hi world" + req);
});

app.post("/geoeventlogger", function(req, res) {
  console.log("reqbody - ", req.body);
  let results = null;
  this.assets = req.body.assets;
  console.log("assets - ", this.assets);
  if (req.body.assets[0] != null) {
    this.assets.forEach(item => {
      this.results = JSON.parse(JSON.stringify(item));
//	console.log('latest Fullness = ', this.results.latestFullness);
      if (this.results.latestFullness == "20 Percent") {
        console.log("create a Service Request");
        createServiceRequest();
      }
    });
  }

  //   console.log('res_data = ', res_data.assets[0]);
  //   console.log('res_data = ', res_data.assets[0].latestFullness);
  //   console.log('request = ', req.body.assets[0].latestFullness);

  res.send("inside app.post");
});

// app.listen(3000, function () {
//   console.log('app listening on port 3000');
// });

// Start listening with socket.io
io.on("connection", function(socket) {
  console.log("a user connected");
});

http.listen(3001, function() {
  console.log("http listening on port:3001");
});
