const { body, param, check, validationResult } = require("express-validator");


exports.login_admin = [
    check('email', '1-email empty or malformed').not().isEmpty().isEmail(),
    check("password", "2-password malformed").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z+_)(*&^%$#@!~}{|?><`'ıöüçşğÊéÂâêîÎûÛİÖ´ÜĞÇŞ€½£₺;,.]{8,32}$/, "i"),

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
exports.add_admin = [
    check('email', '1-email empty or malformed').not().isEmpty().isEmail(),
    check("password", "2-password malformed").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z+_)(*&^%$#@!~}{|?><`'ıöüçşğÊéÂâêîÎûÛİÖ´ÜĞÇŞ€½£₺;,.]{8,32}$/, "i"),
    check('company_name', '3-company_name empty').not().isEmpty(),
    check('max_users', '4-max_users empty or malformed').not().isEmpty().matches(/^[0-9]{2,2}$/, "i"),

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

exports.reset_password = [
    check('email', '1-email empty or malformed').not().isEmpty().isEmail(),
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

exports.update_password = [
    check("new_pass", "2-password malformed").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z+_)(*&^%$#@!~}{|?><`'ıöüçşğÊéÂâêîÎûÛİÖ´ÜĞÇŞ€½£₺;,.]{8,32}$/, "i"),

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