const axios = require('axios');
const express = require('express');
require('dotenv').config();

// express config
const app = express();
const port = process.env.PORT || 3000;

function request(number) {
    axios.post('https://api.17track.net/track/v2/register',
        data={"number": number},
        config={headers: {
            '17token': process.env.API_KEY,
            'Content-Type': 'application/json'
        }}
    ).then((res) => {
        let data = res.data
        console.log(JSON.stringify(data, null, 4));
    }).catch((error) => {
        console.error(error);
    });
}

// request("ZN304903503HK")

// serve static files
app.use(express.static('public'));

// serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

