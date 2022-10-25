let promise_qry = require("../helper/promise_qry")

exports.add_admin = async (email, password,company_name,max_users) => {
    let sql = `INSERT INTO "Admins" ("email","password","company_name","max_users") VALUES('${email}','${password}','${company_name}','${max_users}')`;
    return promise_qry.run(sql).catch((err) => console.log(err))
}

exports.find_admin = async (email) => {
    let sql = `SELECT "id" FROM "Admins" WHERE "email" = '${email}'`;
    return promise_qry.run(sql).catch((err) => console.log(err))
}

exports.admin_login = async (email) => {
    let sql = `SELECT "id","email","password" FROM "Admins" WHERE "email" = '${email}'`;
    return promise_qry.run(sql).catch(err => console.log(err))
}

exports.update_admin_password = async (id, password) => {
    let sql = `UPDATE "Admins" SET "password" = '${password}' WHERE "id" = '${id}'`
    return promise_qry.run(sql).catch(err => console.log(err))
}

exports.get_admin = async (id) => {
    let sql = `SELECT "email", "company_name", "max_users" FROM "Admins" WHERE "id" = ${id}`;
    return promise_qry.run(sql).catch(err => console.log(err))
}   