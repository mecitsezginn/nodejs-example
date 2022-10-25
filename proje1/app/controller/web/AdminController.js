const bcrypt = require("bcrypt");
const TokenController = require("./TokenController")
const eml = require("../../helper/email")
let Admin_mdl = require("../../model/Admin_mdl")
const saltRounds = require("../../config/bcrypt.config")

exports.login = async (req, res) => {
    let email = req.body.email.toLowerCase();
    let password = req.body.password;
console.log("login body: ", req.body);
    Admin_mdl.admin_login(email)
        .then((checkUser) => {
            if (checkUser.length === 0) { return res.status(401).send({ msg: "User not found" }); }

            else {
                let user_data = checkUser[0];
                if (bcrypt.compareSync(password, user_data.password)) {
                    const token = TokenController.admin_token(user_data)
                    const result = {
                        msg: "login successful",
                        a_token: token[0],
                        r_token: token[1]
                    }
                    return res.status(200).send(result);
                }
                else {
                    const result = { msg: "password error" }
                    return res.status(401).send(result);
                }
            }
        })
}


exports.reset_password = async (req, res) => {
    let email = req.body.email.toLowerCase();
    console.log("reset pass body: ", req.body);

    Admin_mdl.admin_login(email)
        .then((checkUser) => {
            if (checkUser.length === 0) {
                let response = {
                    "auth": 0,
                    "meta": "admin not found",
                    "code": 4011,
                    "token": null
                }
                return res.status(401).send(response);
            }
            else {
                let user_data = checkUser[0];
                const a_token = TokenController.email_token(user_data)
                eml.req_new_password(email, a_token)
                    .then(() => {
                        let response =
                        {
                            auth: 1,
                            code: 200,
                            meta: "okay"
                        }
                        return res.status(200).send(response);
                    })
                    .catch(() => {
                        let response = {
                            auth: 1,
                            code: 400,
                            meta: "email error can not send "
                        }
                        return res.status(200).send(response);
                    })
            }
        })
}

exports.update_password = async (req, res) => {
    let id = req.id;
    let password = req.body.new_pass;
    let enc_pass = bcrypt.hashSync(password, saltRounds);

    Admin_mdl.update_admin_password(id, enc_pass)
        .then(() => {
            res.status(200).send({ msg: "password updated" })
        })
}

exports.add_admin = async (req, res) => {
    let email = req.body.email.toLowerCase();
    let password = req.body.password;
    let company_name = req.body.company_name;
    let max_users = req.body.max_users;

    if (email === undefined || password === undefined) {
        const result = { msg: "email or password error" }
        return res.status(403).send(result)
    }
    else {
        Admin_mdl.find_admin(email)
            .then((checkAdmin) => {
                if (checkAdmin.length > 0) { return res.status(403).send({ msg: "this email is being used" }) }
                else {
                    const enc_pass = bcrypt.hashSync(password, saltRounds);

                    Admin_mdl.add_admin(email, enc_pass,company_name,max_users)
                        .then(() => {
                            const result = { msg: "user registration successful" }
                            return res.status(200).send(result);
                        })
                        .catch(() => {
                            const result = { msg: "database error" }
                            return res.status(403).send(result)
                        })
                }
            })
    }

}

exports.get_admin = async (req, res) => {
    let admin_id = req.admin_id;
    let admin_profile = await Admin_mdl.get_admin(admin_id).catch(e => { console.log(e); })

    res.status(200).send({meta:"admin profile", payload: admin_profile[0]})

}