const axios = require('axios');
const express = require('express');
require('dotenv').config();

// express config
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.set('view engine', 'ejs');

function request(number, res_main) {
    axios.post('https://api.17track.net/track/v2/register',
        data={"number": number},
        config={headers: {
            '17token': process.env.API_KEY,
            'Content-Type': 'application/json'
        }}
    ).then((res) => {
        console.log(JSON.stringify(res.data, null, 4));
        if (data.accepted && data.rejected && data.accepted.length > 0 && data.rejected.length > 0) {
            return res_main.render('success', {
                accepted: res.data.accepted,
                rejected: res.data.rejected
            });
        }
        return res_main.render('failure', {
            errors: data.errors || []
        });
    }).catch((error) => {
        return res_main.render('failure', {
            errors: error.response.data.errors || []
        });
    });
}

// serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// post request
app.post('/track', (req, res) => {
    let package_id = req.body.package_id;
    return request(package_id, res);
});

app.listen(port, () => console.log(`port :${port}!`));

