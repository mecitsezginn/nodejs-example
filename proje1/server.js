const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require('https');
const fs = require('fs');
const path = require("path")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// app.use(multer().array())

app.use((req, res, next) => {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token,x-refresh-token,x-email-token,x-guest-token');

    next();

})

require('./app/router/router.js')(app);

srv = https.createServer({
    key: fs.readFileSync(path.resolve("./ssl/privkey.pem")),
    cert: fs.readFileSync(path.resolve("./ssl/cert.pem"))
}, app)

const port = 4000;
srv.listen(port, () => { console.log(`https://localhost:${port}`) });
