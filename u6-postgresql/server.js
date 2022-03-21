const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.json());


require("./web/router/router")(app)

app.listen(1234,()=>{
    console.log(`http://localhost:1234`)
})
