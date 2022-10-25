const jwt = require("jsonwebtoken")
const { jwt_config } = require("../config/jwt.config")
const TokenController = require("../controller/web/TokenController")

exports.verifyToken = (req, res, next) => {
    let a_token = req.headers['x-access-token'];
    let r_token = req.headers['x-refresh-token'];
    let stat_undefined, stat_expired, stat_err;

    stat_err = 401
    stat_undefined = 403
    stat_expired = 200

    let admin_secret = jwt_config.secret_admin

    jwt.verify(r_token, admin_secret, (err_r_token, r_decoded) => {
        if (err_r_token) {
            console.log("err_r_token", err_r_token)

            let response = {
                auth: 0,
                code: 1,
                meta: "Tokens error - Failed to authentificate ! ",
            }
            return res.status(stat_err).send(response);
        }
        jwt.verify(a_token, admin_secret, (err_a_token, decoded) => {
            if (err_a_token) {
                let [new_access_token, new_access_r_token] = TokenController.admin_token(r_decoded);

                let response = {
                    "auth": 1,
                    "code": 200,
                    "meta": "new a_token",
                    "a_token": new_access_token,
                    "r_token": new_access_r_token
                }
                return res.status(stat_expired).send(response);
            } else {
                req.admin_id = r_decoded.id;
                next();
            }
        })
    });
}


exports.verifyTokenUpdatePassword = (req, res, next) => {
    let a_token = req.headers['x-access-token'];

    if (a_token == "undefined") {

        let response = {
            auth: 0,
            code: 0,
            meta: "no access token",
        }

        return res.status(403).send(response);
    }

    let admin_secret = jwt_config.secret_email
    jwt.verify(a_token, admin_secret, (err_a_token, decoded) => {
        if (err_a_token) {
            //if access token expired check refresh token

            let response = {
                auth: 0,
                code: 1,
                meta: "Tokens error - Failed to authentificate ! ",
            }
            return res.status(401).send(response);
        }
        else {
            req.id = decoded.id;
            next();
        }

    });

}