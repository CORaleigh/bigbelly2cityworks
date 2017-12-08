var request = require("request-promise");
const WebSocket = require("ws");
const ws = new WebSocket(
  "ws://GEODEVAPPLV1.CI.RALEIGH.NC.US:6180/arcgis/ws/services/Bigbelly/StreamServer/subscribe"
);

// traditional js notation
// ws.on("message", function incoming(data) {
//   console.log(data);
// });

// same thing as above but with arrow notation
// ws.on("message", data => console.log(data) );

let srPostBody = {
  callerFirstName: "Surender",
  callerLastName: "Dalal",
  callerWorkPhone: "9196708062",
  location: "",
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

let results = "";
ws.on("message", data => {
  this.results = JSON.parse(data);
  if (this.results.attributes.latestFullness === "100 Percent") {
    // We're at 100% on the big belly, create a Service Request in Cityworks
    srPostBody.x = this.results.geometry.x;
    srPostBody.y = this.results.geometry.y;
    srPostBody.location = this.results.attributes.description;
    srPostBody.comments = 'This Service Request was auto-generated based on Big Belly status of 100% full';
    createServiceRequest();
  }
});

var options = {
  method: "POST",
  url:
    "http://rhsoatstapp1.ci.raleigh.nc.us:8182/RaleighAPI/cityworks/createServiceRequest/",
  headers: {
    "Content-Type": "application/json"
  },
  body: srPostBody,
  json: true
};

function createServiceRequest() {
  request(options)
    .then(response => {
      // Handle the response
      console.log("response is ", response);
    })
    .catch(err => {
      // Deal with the error
      console.log("error is ", err);
    });
}

