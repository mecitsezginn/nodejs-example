const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
let User_mdl = require("../../model/User_mdl")
let Admin_mdl = require("../../model/Admin_mdl")
const { rfid_encrypter } = require("../../helper/aes_encoder")


exports.list_users = async (req, res) => {
    let admin_id = req.admin_id
    list_users = await User_mdl.list_users(admin_id).catch(e => { console.log(e); });
    if (list_users === undefined) {
        response = {
            "auth": 1,
            "code": 5001,
            "meta": "database error",
        }
        return res.status(500).send(response);
    }

    response = { "msg": "user_list", "payload": list_users }
    return res.status(200).send(response);
}


async function file_processer(filename) {
    let users = []
    let count_user = 0
    return new Promise(function (resolve, reject) {
        fs.createReadStream(path.join(__dirname, "../../../data/csv/" + filename))
            .pipe(csv())
            .on('data', function (data) {
                let obj = Object.keys(data)
                let data_id = data[obj[0]]
                data_id = data_id.replace(/["|=]/g,"");
                
                console.log(data.ID ,data_id, count_user);
                if (data_id) {
                    count_user++
                    users.push({ "rfid_no": data_id, "code": rfid_encrypter(data_id) })
                }
            })
            .on('end', function () {
                console.log("User list ", users);
                resolve([users, count_user]);
            });
    })
}

exports.upload_users = async (req, res) => {
    let admin_id = req.admin_id
    let file = req.file
    if (file == undefined) { return res.status(400).send({ message: "Please upload a file!" }); }

    let admin_info = await Admin_mdl.get_admin(admin_id).catch(e => { console.log(e); })
    let [users, count_user] = await file_processer(file.filename)

    if (count_user > admin_info[0].max_users) { return res.status(502).send({ 'msg': "Exceed max users " }); }
    await User_mdl.add_user(users, admin_id)
        .then(() => { return res.status(200).send({ "msg": "user is added " }); })
        .catch(e => {
            if (e.code == "23505") {
                return res.status(501).send({ 'msg': "Duplicate Error: " + e.detail });
            }
        });
}

exports.add_user = async (req, res) => {
    let admin_id = req.admin_id
    let { rfid } = req.body

    let admin_info = await Admin_mdl.get_admin(admin_id).catch(e => { console.log(e); })

    let max_users = admin_info[0].max_users
    let count_user = await User_mdl.user_count(admin_id)
    count_user = Number(count_user[0].count)+1
    if (count_user > max_users) { return res.status(502).send({ 'msg': "Exceed max users " }); }

    let users = [{ rfid_no: rfid, code: rfid_encrypter(rfid) }]
    await User_mdl.add_user(users, admin_id).then(() => {
        response = { "msg": "user is added " }
        return res.status(200).send(response);

    }).catch(e => {
        if (e.code == "23505") {
            return res.status(501).send({ 'msg': "Duplicate Error: " + e.detail });
        }
        return res.status(500).send({ 'msg': 'db error' });
    });
}

exports.delete_user = async (req, res) => {
    let userid = req.body.user_id;
    User_mdl.del_user(userid)
        .then(() => {
            return res.status(200).send({ msg: "ok" });
        })
}
