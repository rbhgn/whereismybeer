const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 4000;

app.use(
  cors(),
  express.static(path.join(__dirname, 'build'))
  )

app.get(
  '*', 
  (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html'))
)

app.listen(PORT);