const jwt = require("jsonwebtoken")
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const jwtKey = "my_secret_key"
// const jwtExpirySeconds = 300



app.post("/user/generateToken", (req, res) => {
    const {name, password} = req.body   
    
    const status = findUser(name,password)
    if(status){
        let data = {name: name, id:100}
        // const token = jwt.sign(data, jwtKey,{expiresInMinutes:3});
        const token = jwt.sign(data, jwtKey);
        res.status(200).send({user: name, token:token});
    }
    else{
        res.status(403).send({user: "kullanıcı yok", token:403});
    }
  
    
});

app.listen(8080, () => {
    console.log("Yayın başladı...");
    console.log(`http://localhost:8080`);
});


const users =[
    {id:1, name: "Mecit",password: "123"},
    {id:2, name: "Sezgin",password: "123"},
    {id:3, name: "Ahmet",password: "123"},
]
const findUser = (username,password) =>{
    let result = false
    users.map((item)=>{
        if(username === item.name && password === item.password){
            result = true
        }
    })
    return result
}
