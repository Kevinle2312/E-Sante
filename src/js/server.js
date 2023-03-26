const express = require('express');
const path = require('path');

const app = express();

app.use("/src",express.static(path.join(__dirname, '../src/js',)));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Server listening on port 8080');
});


