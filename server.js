const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;
var cors = require('cors')

app.use(cors({credentials: true, origin: true}))

app.use( express.static(path.join(__dirname, 'build')) )

app.get('*', function (req, res) {
 res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT);