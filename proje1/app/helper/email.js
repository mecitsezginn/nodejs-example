var Handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

var nodemailer = require("nodemailer");
var { smtp_settings } = require("../config/email.config");
const transporter = nodemailer.createTransport(smtp_settings);

exports.req_new_password = async (rcvrer_email, token) => {
    // console.log(rcvrer_email);

    let email_data = { token: token }
    let html_email = ``;

    let source = template = null
    source = fs.readFileSync(path.join(__dirname, '../emails/req_newpass.hbs'), 'utf8');
    template = Handlebars.compile(source);
    html_email = template(email_data);

    var mailOptions = {
        from: '"XenonSmart" <' + smtp_settings.auth.user + ">",
        to: rcvrer_email,
        subject: "DoorsApp",
        html: html_email,
    };

    let info = await transporter.sendMail(mailOptions).catch((e) => {
        console.log(e);
    });
    //console.log(info.response);
    if (info) {
        return info.response.includes("250 2.0.0 Ok"); // returns true or false
    } else {
        return false;
    }
}