let User_mdl = require("../../model/User_mdl")

exports.mobile_user_login = async (req, res)=>{
    let user_code = req.body.user_code;
    
    User_mdl.mobile_user_login(user_code)
    .then((checkUserCode)=>{
        if (checkUserCode.length === 0) { return res.status(611).send({ msg: "Usercode not found" }); }
        else{
            let id = checkUserCode[0].id;

            User_mdl.check_status(id)
            .then((checkStatus)=>{
                let status = checkStatus[0].status;

                if(status === 0) { return res.status(612).send({ msg: "login error" }); }
                else{
                    User_mdl.update_status(id)
                    .then(()=>{
                        const result = {msg: "login successful"}
                        return res.status(200).send(result);
                    })
                }
            })
        }
    })
}