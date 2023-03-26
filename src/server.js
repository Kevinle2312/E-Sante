const express = require('express');
const path = require('path');

const app = express();

app.use("/js", express.static(path.join(__dirname, '../src/js')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../html/index.html'));
});

app.get('/js/main.js', function(req, res) {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'main.js'));
});

app.listen(process.env.PORT || 8080, function() {
  console.log('Server listening on port 8080');
});


