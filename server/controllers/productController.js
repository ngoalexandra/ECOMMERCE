module.exports = {
    // create new product
    createProduct: (req, res) => {
        console.log("in create product");
        var sql = `INSERT INTO products (product_name, description, color, qty, price, created_at, updated_at, sku, img) VALUES ('${req.body.product_name}', '${req.body.description}', '${req.body.color}','${req.body.qty}', '${req.body.price}', NOW(), NOW(), '${req.body.sku}', '${req.body.img}');`;
        connection.query(sql, function (err, product) {
            console.log(product);
            if (err) throw err;
            res.json({ message: "Success", success: true });
        })
    },

    // Get all products
    getProducts: (req, res) => {
        var sql = `SELECT id, product_name, description, color, qty, price, DATE_FORMAT(created_at, "%d-%c-%Y, %H:%i") as 'date_created', DATE_FORMAT(updated_at, "%d-%c-%Y, %H:%i") as 'date_created', sku, img FROM UserSQL_DB.products ORDER BY id;`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("RESULT SQL QUERY ==>", result);
            res.json({ message: "success", result: result });
        })
    },

    deleteProduct: (req, res) => {
        console.log("In delete function");
        var sql = `DELETE FROM products WHERE id= '${req.params.id}';`;
        console.log(req.params.id);
        connection.query(sql, function (err, productToDelete) {
            if (err) throw err;
            res.json({ message: "Successfully deleted" })

        })
    },
    findOne: (req, res) => {
        console.log("In find one");
        var sql = `SELECT * FROM products WHERE id = '${req.params.id}';`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.json({ message: "Successfully edited", result: result[0] });
        })
    },
    editProduct: (req, res) => {
        var sql = `UPDATE products SET product_name = '${req.body.product_name}', description = '${req.body.description}', qty = '${req.body.qty}', color = '${req.body.color}', price = '${req.body.price}', sku = '${req.body.sku}', updated_at = NOW(), img = '${req.body.img}' WHERE id = '${req.params.id}'; `;
        connection.query(sql, function (err, productToEdit) {
            if (err) throw err;
            res.json({ message: "Success" })
        })
    },
    sendSearchStr: (req, res) => {
        console.log("In search str method in controller")
        var query = `SELECT * FROM products WHERE product_name LIKE '%${req.params.search_str}%';`;
        connection.query(query, function (err, results) {
            console.log("these are the results *******", results)
            if (err) throw err;
            if (results.length > 0)
                res.json({ message: "Success", found: true, results: results });
            else {
                res.json({ found: false, results: '' });
            }
        })
    },

    byOrder: (req, res) => {
        var query = `SELECT * FROM products ORDER by product_name`;
        connection.query(query, function (err, products) {
            if (err) throw err;
            res.json({ message: "Success", products: products });
        })
    },

    descOrder: (req, res) => {
        var query = `SELECT * FROM products ORDER BY product_name desc`;
        connection.query(query, function (err, results) {
            if (err) throw err;
            res.json({ message: "Success", results: results });
        })
    },

    priceByOrder: (req, res) => {
        var query = `SELECT * FROM products ORDER by price`;
        connection.query(query, function (err, results) {
            if (err) throw err;
            res.json({ message: "Success", results: results });
        })
    },

    priceHighToLow: (req, res) => {
        var query = `SELECT * FROM products ORDER BY price desc`;
        connection.query(query, function (err, results) {
            if (err) throw err;
            res.json({ message: "Success", results: results })
        })
    },


    // ============== data for cart's session ======================
    checkOutSession: (req, res) => {
        console.log(">>>>>>>>> req.body", req.body);
        // for the req, it is recieving the cart object (this.cart) being sent from the front-end . In the component.ts 
        var prod_id_arr = [];
        // we are going convert the id into strings
        var string_of_ids = '';
        console.log('req.session.cart', req.session['cart']);

        for (var i = 0; i < req.body['cart'].length; i++) {
            //push the id into the array
            prod_id_arr.push(req.body['cart'][i]['id']);

            // if there is only one in the array string will only equal that id
            if (prod_id_arr.length === 1) {
                string_of_ids += (req.body['cart'][i]['id'])
            }

            // if there is more than one ID in the array, separate by a comma
            else if (prod_id_arr.length > 1) {
                string_of_ids += (', ' + (req.body['cart'][i]['id']));
            }
        }
        console.log(' id array =====>', prod_id_arr);
        console.log('string ========>', string_of_ids);

        // set in session
        req.session.string_of_ids = string_of_ids;
        req.session['cart'] = req.body['cart'];
        res.json({ message: "Success" })
    },


    // ------------ Get All Cart Items ------------------

    getAllCartItems: (req, res) => {
        console.log("REQUEST SESSION STRING", req.session.string_of_ids);
        console.log('productController > getAllCartItems'.yellow);
        console.log('getAllCartItems >> req.session.cart =>', req.session['cart']);

        if (!req.session['cart']) {
            res.json({ message: 'Error' });
        }
        // if cart has something in get items
        else if (req.session['cart']) {
            var sql = `SELECT * FROM UserSQL_DB.products WHERE id in (${req.session.string_of_ids});`
            connection.query(sql, function (err, results) {
                if (err) throw err;
                console.log(results);
                res.json({ message: "Success", results: results });
            });
        }
    },
}