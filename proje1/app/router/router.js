const multer = require("multer");
const upload = multer({ dest: 'data/csv/' });
module.exports = function (app) {

    //middlewares
    const verifyToken = require("../middleware/verifyJWTToken")
    const validate_web = require('../middleware/validate_web')

    const validate_mobile = require("../middleware/validate_mobile")
    //controllers
    const AdminController = require("../controller/web/AdminController")
    const UserController = require("../controller/web/UserController")
    //mobile controler
    const MobileUserControler = require("../controller/mobile/UserController")

    app.post("/login",[validate_web.login_admin], AdminController.login);
    
    app.get("/admin_profile", [verifyToken.verifyToken], AdminController.get_admin);
    app.post("/add_admin", [validate_web.add_admin, verifyToken.verifyToken], AdminController.add_admin);
    app.post("/reset_pass",[validate_web.reset_password],  AdminController.reset_password)
    app.put("/update_pass",[validate_web.update_password  ,verifyToken.verifyTokenUpdatePassword], AdminController.update_password);
    
    app.get("/list_users",[verifyToken.verifyToken], UserController.list_users)
    app.post("/add_user", [verifyToken.verifyToken], UserController.add_user);
    app.post("/add_user/upload", [upload.single('file'), verifyToken.verifyToken], UserController.upload_users);
    app.delete("/delete_user", [verifyToken.verifyToken], UserController.delete_user);

    //mobile
    app.post("/login_user_code", [], MobileUserControler.mobile_user_login);

}