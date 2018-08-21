// var users = require('../controllers/users.js');
// const ctrl = require("./../controllers/userController.js");
const ctrl = require("./../controllers/userController.js");
const prodCtrl = require("./../controllers/productController.js");

console.log("SERVER > routes.js".blue);

module.exports = function(app) {

// ==================== USER ROUTES ====================================

//======= REGISTER routes ===========
    // Create new user
    app.post("/api/new_user", ctrl.newUser);

    // fetch all users
    app.get("/api/fetchAll", ctrl.getUsers);


// ======== Login route ============
    // check user 
    app.post("/api/checkUser", ctrl.checkUser);


// ======= CHECK SESSION =========
    app.get("/api/checkSession", ctrl.checkSession);


// ======= DESTROY SESSION ========
    app.get("/api/destroySession", ctrl.destroySession);

//========= CHECK if ADMIN ========
    app.get("/api/checkIfAdmin", ctrl.checkIfAdmin);

// ==================== PRODUCTS ROUTES ====================================

app.post("/api/createProduct", prodCtrl.createProduct);

app.get("/api/allProducts", prodCtrl.getProducts);

app.delete("/api/:id/deleteProduct", prodCtrl.deleteProduct);

app.get("/api/:id", prodCtrl.findOne);

app.put("/api/:id/edit", prodCtrl.editProduct);

app.get("/api/product/search/:search_str", prodCtrl.sendSearchStr);

app.get("/api/products/byOrder", prodCtrl.byOrder);

app.get("/api/products/byDesc", prodCtrl.descOrder);

app.get("/api/products/pricebyOrder", prodCtrl.priceByOrder);

app.get("/api/prodcuts/priceHighToLow", prodCtrl.priceHighToLow);
}