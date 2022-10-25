const { body, param, check, validationResult } = require("express-validator");

exports.mobile_user_login = [
    check('user_code', '1-usercode empty or malformed').not().isEmpty().matches(/^[0-9]{5,15}$/, "i"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            let response = {
                auth: 1,
                meta: errors,
                token: null
            }

            return res.status(401).json(response);
        }
        next();
    }
]