const cartCtrl = require("./../controllers/cartController");

module.exports = (app) => {
   app.post("/api/checkOutSession", cartCtrl.checkOutSession);
   app.get("/api/getAllCartProducts", cartCtrl.getAllCartItems);
   app.get("/api/:id", prodCtrl.findOne);
   app.get("/api/product/clearCartSession", cartCtrl.clearSession)
   app.get("/api/products/removeItemSession/:id", cartCtrl.removeFromSession)
}