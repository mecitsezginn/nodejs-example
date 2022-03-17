const express = require("express");
const router = express.Router();
const app = express();
const bodyParser = require("body-parser");

const port = 5555;
const enc_dec = require("./enc_dec")


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use("/",router);

router.get("/", (req,res,next)=>{
    res.status(200).send("it is working")
})

router.post("/encryption",(req,res,next)=>{
    const {rfids} = req.body;
    res.status(200).send(enc_dec.enc(rfids))
})

router.post("/decryption",(req,res,next)=>{
    const {rfids} = req.body;
    res.status(200).send(enc_dec.dec(rfids))
})


app.listen(port,()=>{
    console.log("yayın başladı");
    console.log(`localhost:${port}`)
})