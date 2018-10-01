
const ctrl = require("./../controllers/userController.js");

module.exports = function (app) {
    // register
    app.post("/api/new_user", ctrl.newUser);
    app.get("/api/fetchAll", ctrl.getUsers);
    // login
    app.post("/api/checkUser", ctrl.checkUser);
    app.get("/api/checkSession", ctrl.checkSession);
    app.get("/api/destroySession", ctrl.destroySession);
    app.get("/api/checkIfAdmin", ctrl.checkIfAdmin);
}