module.exports = {
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
        var total_price = 0;
        var final_price = 0;
        var totalItemsBack = [];
        // if there isn't a cart, give response back
        if (!req.session['cart']) {
            res.json({ message: 'Error' });
        }
        // if cart has something, get items through the query
        else if (req.session['cart']) {
            var sql = `SELECT * FROM products WHERE id in (${req.session.string_of_ids});`
            connection.query(sql, function (err, results) {
                if (err) throw err;
                //  ********  calcuate price of each product  **********
                // first loop is to loop through the results, second loop is to loop through products in the cart. if the product from the DB matches the PRODUCT ID in cart's session , the total price is the product's price in DB * session's quantity of that item
                for (var i = 0; i < results.length; i++) {
                    for (var i = 0; i < req.session['cart'].length; i++) {
        
                        if (results[i]['id'] === req.session['cart'][i]['id']) {
                            total_price = (results[i]['price'] * req.session['cart'][i]['qty'])
                            final_price += total_price;
                            totalItemsBack.push({
                                id: results[i]['id'],
                                product_name: results[i]['product_name'],
                                price: results[i]['price'],
                                qty: req.session['cart'][i]['qty'],
                                total_price: total_price
                            })
                        }
                    }
                }
                res.json({ message: "Success", results: results, totalItemsBack: totalItemsBack , final_price: final_price});
            });
        }
    },
    // ============== CLEAR SESSION =====================

    clearSession: (req, res) => {
        req.session['cart'] = null;
        console.log("***************", req.session['cart'])
        res.json({message: "Successfully cleared cart" });
    }

    
}