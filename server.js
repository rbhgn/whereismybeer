const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
var cors = require('cors')


// app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use( express.static(path.join(__dirname, 'build')) )

app.get('*', function (req, res) {
 res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);