const crypto = require("crypto");
const res = require("express/lib/response");
const rules = require("nodemon/lib/rules");

//16 bit key
const key = "0123456789ABCDEF";

function encryption(message){
    message = String(message)
    const cipher = crypto.createCipheriv("aes-128-ecb",key,null);
    let result = Buffer.concat([cipher.update(message), cipher.final()]).toString("base64");
    return result
}

function decryption(enc_text){
    enc_text = Buffer.from(enc_text, "base64")
    const cipher = crypto.createDecipheriv("aes-128-ecb",key,null);
    let result = Buffer.concat([cipher.update(enc_text), cipher.final()]).toString("utf8");
    return result
}

exports.enc = function(rfid){
    let result = []
    rfid.map((item)=>{
        result.push({name: item.name, rfid: encryption(item.rfid)})
    })

    result = {"rfids": result}
    return result
}

exports.dec = function(enc_text){
    let result = []
    enc_text.map((item)=>{
        result.push({name: item.name, rfid: decryption(item.rfid)})
    })
    result = {"rfids": result}
    return result
}