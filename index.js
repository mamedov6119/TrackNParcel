const axios = require('axios');
const express = require('express');
require('dotenv').config();

// express config
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

function request(number, res_main) {
    axios.post('https://api.17track.net/track/v2/register',
        data={"number": number},
        config={headers: {
            '17token': process.env.API_KEY,
            'Content-Type': 'application/json'
        }}
    ).then((res) => {
        res_main.send(JSON.stringify(res.data, null, 4));
    }).catch((error) => {
        res_main.send(JSON.stringify(error, null, 4));
    });
}

// serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// post request
app.post('/track', (req, res) => {
    let package_id = req.body.package_id;
    request(package_id, res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

