// import env
require('dotenv').config();

// import axios
const axios = require('axios');
const { json } = require('body-parser');

// express app
const express = require('express');
const app = express();
const port = 3000;

// how to use the following in axios curl -X POST \
//   --header '17token:YourKey' \
//   --header 'Content-Type:application/json' \
//   --data '[
//             {
//               "number": "RR123456789CN"
//             }
//           ]' \
//   https://api.17track.net/track/v2/register

// axios config

const config = {
    headers: {
        '17token': process.env.API_KEY,
        'Content-Type': 'application/json'
    }
};

// axios data

const data = [
    {
        "number": "LV668867798CN"
        
    }
];

// axios post


axios.post('https://api.17track.net/track/v2/register', data, config).then((res) => {
    let data = res.data
    console.log(`statusCode: ${res.statusCode}`);
    console.log(JSON.stringify(data, null, 4));
}).catch((error) => {
    console.error(error);
});




// serve static files

app.use(express.static('public'));

app.get('/', (req, res) => {
    // serve index.html
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

