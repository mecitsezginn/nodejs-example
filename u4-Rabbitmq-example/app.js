const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const port = 8888;

const emailPublisher = require("./publisher");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use("/",router);

router.get("/", (req, res, next) =>{
    res.send("selam çalışıyorum")
})

router.post("/register", async (req, res, next) =>{
    const {email} = req.body

    await emailPublisher(email);
    res.status(200).json({msg:"kayıt işlemi başarılı. Birazdan email bilgisi gelecektir."})
    // setTimeout(()=>{
    //     res.status(200).json({email:email, date:Date.now()})
    // },5000)

})

app.listen(port, ()=>{
    console.log("yayın başladı");
    console.log(`localhost:${port}`)
})