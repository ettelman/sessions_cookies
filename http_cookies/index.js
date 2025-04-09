const express = require('express');
const cookieParser = require('cookie-parser');
const createReadStream = require('fs').createReadStream;

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); // För att hantera x-www-form-urlencoded data
app.use(cookieParser());

app.get('/', (req, res) => {
    const user = req.cookies.username;
    if (user) {
        res.send(`Logged in as ${user}`);
    } else {
        createReadStream('index.html').pipe(res);
    }
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === 'bobbo' && password === 'password') {
        res.cookie('username', username);
        res.send('Du har loggat in!');
    } else {
        res.status(401).send('Fel användarnamn eller lösenord');
    }
});

app.listen(port, () => {
    console.log('Server is up @' + port);
});
