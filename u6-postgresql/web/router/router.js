module.exports = (app)=>{

    const dbUser = require("../model/dbUser")

    app.get("/a",dbUser.getUserList);
}

