// express app
const express = require('express');
const app = express();
const port = 3000;


// serve static files

app.use(express.static('public'));

app.get('/', (req, res) => {
    // serve index.html
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

