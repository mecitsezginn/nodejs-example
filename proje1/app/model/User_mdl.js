let promise_qry = require("../helper/promise_qry");


exports.list_users = (admin_id) => {
  let sql = `SELECT id, rfid_no AS rfid, code AS user_code, status FROM "public"."Users" WHERE admin_id_fk = ${admin_id} ORDER BY "created_at";`;
  return promise_qry.run(sql).catch((e) => { console.log(e); });
};

exports.add_user = async (users, admin_id) => {

  let arr = []
  users.forEach(obj => {
    arr.push(`('${obj.rfid_no}', '${obj.code}', ${admin_id}, 1, NOW())`)
  });
  let sql1 = `INSERT INTO "public"."Users"(rfid_no, code, admin_id_fk, status, created_at) 
                VALUES ${arr};`
  return promise_qry.run(sql1);
}

exports.del_user = async (id) => {
  let sql = `DELETE FROM "Users" WHERE "id" = '${id}'`;
  return promise_qry.run(sql).catch((e) => { console.log(e); });
};

exports.check_user = async (admin_id, user_id) => {
  let sql = `SELECT "id" FROM "Users" WHERE "id" = '${user_id}' AND "admin_id_fk" = '${admin_id}'`;
  return promise_qry.run(sql).catch((e) => { console.log(e); });
}

exports.mobile_user_login = async (user_code) => {
  let sql = `SELECT "id" FROM "Users" WHERE "code" = '${user_code}'`;
  return promise_qry.run(sql).catch((e) => { console.log(e); });
}

exports.check_status = async (id) => {
  let sql = `SELECT "status" FROM "Users" WHERE "id" = '${id}'`;
  return promise_qry.run(sql).catch((e) => { console.log(e); });
}

exports.update_status = async (id) => {
  let sql = `UPDATE "Users" SET "status" = '0' WHERE "id" = '${id}'`;
  return promise_qry.run(sql).catch((e) => { console.log(e); });
}


exports.user_count = async (admin_id) => {
  let sql = `SELECT count(*) FROM "Users" WHERE "admin_id_fk" = '${admin_id}'`;
  return promise_qry.run(sql).catch((e) => { console.log(e); });
}