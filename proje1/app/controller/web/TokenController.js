const jwt = require("jsonwebtoken");
let {jwt_config} = require("../../config/jwt.config") ;


exports.admin_token = (user)=>{
    let data = {
        id: user.id
    };
    
    let a_token = jwt.sign(data,jwt_config.secret_admin,{expiresIn: 600})
    let r_token =  jwt.sign(data,jwt_config.secret_admin,{expiresIn: 2592000})

    return [a_token,r_token]
}

exports.email_token = (user)=>{
    let data = {
        id: user.id
    };
    let a_token = jwt.sign(data,jwt_config.secret_email,{expiresIn: 3600})
    return a_token
}