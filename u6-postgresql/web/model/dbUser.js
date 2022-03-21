const client = require("../helper/dbConnectHelper")


exports.getUserList = (req,res)=>{
    client.connect()
    client.query("SELECT first_name, last_name FROM actor",(err,result)=>{
        if(!err){
            console.log("result","ok")
            return res.status(200).send(result.rows)
        }
        else{
            console.log("err",err)
            return res.status(403).send(err)
        }
    })
    
    client.end;
    
}