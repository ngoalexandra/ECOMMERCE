const prodCtrl = require("./../controllers/productController.js");

module.exports = function (app) {
    app.post("/api/createProduct", prodCtrl.createProduct);
    app.get("/api/allProducts", prodCtrl.getProducts);
    app.delete("/api/:id/deleteProduct", prodCtrl.deleteProduct);
    app.put("/api/:id/edit", prodCtrl.editProduct);
    app.get("/api/product/search/:search_str", prodCtrl.sendSearchStr);
    app.get("/api/products/byOrder", prodCtrl.byOrder);
    app.get("/api/products/byDesc", prodCtrl.descOrder);
    app.get("/api/products/pricebyOrder", prodCtrl.priceByOrder);
    app.get("/api/prodcuts/priceHighToLow", prodCtrl.priceHighToLow);

}