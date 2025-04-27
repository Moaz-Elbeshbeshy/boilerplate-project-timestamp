// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

// API endpoint to return the current timestamp
app.get("/api/:date?", function (req, res) {
  const dateParam = req.params.date;
  let date;

  // check if dateParam is not provided
  if (!dateParam) {
    date = new Date();
  } else {
    if (isNaN(dateParam)) {
      // check if dateParam is not a number, which means it is a string utc
      date = new Date(dateParam);
    } else {
      // check if dateParam is a number, which means it is a unix timestamp
      date = new Date(parseInt(dateParam));
    }
  }
  // check if date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  } else {
    // return the date in the required format
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    })
  }
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
