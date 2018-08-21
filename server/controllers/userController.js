const bcrypt = require("bcrypt");
module.exports = {

    // =========== CREATE new user ===========
    newUser: (req, res) => {
        console.log("MySQL connected as id ".yellow + connection.threadId)
        var email_query = `SELECT email FROM users WHERE email = '${req.body.email}' LIMIT 1;`
        connection.query(email_query, function (err, email) {
            if (err) throw err;
            if (email.length > 0) {
                res.json({ message: "Email already exists", success: false });
            } else {
                console.log("This email is unique, proceed")
                bcrypt.hash(req.body.password, 10, function (error, hash) {
                    var sql = `INSERT INTO UserSQL_DB.users (first_name, last_name, email, password, created_at, updated_at, admin) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${hash}', NOW(), NOW(), '0');`;
                    connection.query(sql, function (err, result) {
                        if (err) throw err;
                        res.json({ message: 'ok', success: true });
                    });
                })
            }
        });

    },

    // ============== FETCH ALL USERS ==================
    getUsers: (req, res) => {
        var sql = `SELECT id, first_name, last_name, email, password, admin, DATE_FORMAT(created_at, "%d-%c-%Y, %H:%i") as 'date_created' FROM UserSQL_DB.users ORDER BY id;`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log('RESULT SQL QUERY =>', result);
            res.json({ message: 'ok', result: result });
        });
    },


    // ==================== LOGIN check user ================
    checkUser: (req, res) => {
        // find
        var sql = `SELECT email, admin, id FROM users WHERE email='${req.body.email}' LIMIT 1;`
        connection.query(sql, function (error, user) {
            if (error) throw err;

            if (user.length > 0) {
                console.log("USER", user)
                if (user[0]['email'] === req.body.email) {
                    console.log("email was found in the database");
                    var pass_sql = `SELECT password FROM users WHERE email = '${req.body.email}' LIMIT 1;`
                    connection.query(pass_sql, function (err, sql_res) {
                        if (err) throw err;
                        bcrypt.compare(req.body.password, sql_res[0].password, function (error, hash_result) {
                            if (error) throw error;
                            console.log(hash_result);
                            if (hash_result === true) {
                                // check if they are admin
                                if (user[0].admin === 1) {
                                    req.session.user_id = user[0].id;
                                    console.log(user[0].admin);
                                    res.json({ message: "Success", canLogin: true, admin: true });

                                }
                                else if (user[0].admin != 1) {
                                    console.log("User is not ADMIN");
                                    req.session.user_id = user[0].id;
                                    res.json({ message: "Error", canLogin: true, admin: false });

                                }
                            } else {
                                // if password does not match the hased password in DB
                                console.log("Password does not match")


                            }
                        })
                    })

                } else {
                    console.log("Email does not exist within our database");
                    res.json({ message: "Error while trying to login", canLogin: false, admin: false });
                }
            }
        })
    },



    // ========= SET ADMIN ==========
    // UPDATE UserSQL_DB.users SET admin = '1' WHERE id = 1;



    // ========== CHECK SESSION ==========
    checkSession: (req, res) => {
        if (req.session['user_id']) {
            console.log(req.session['user_id'])
            res.json({ message: `session exists with ${req.session['user_id']}`, continue: true });
        } else {
            res.json({ message: `NO SESSION EXISTS! STOP & REDIRECT!`, continue: false });
        }
    },

    // ========== CHECK ADMIN RIGHTS ===========
    checkIfAdmin: (req, res) => {
        console.log('inside > SERVER > checkIfAdmin > USER CONTROLLER');
        console.log(`req.session['userid'] =>`.bgYellow.black, req.session['userid']);
        var sql = `SELECT admin FROM UserSQL_DB.users WHERE id='${req.session['userid']}';`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log('RESULT SQL QUERY =>', result);
            console.log('RESULT SQL QUERY result[0]["admin"] =>', result[0]);
            if (result.length < 1) {
                console.log(`!!! NOT ADMIN this userid => ${req.session['userid']}`);
                res.json({ message: 'not admin', powerLevel: 0 });
            } else if (result.length > 0) {
                if (result[0]['admin'] === 1) {
                    console.log(`user is ADMIN! from db => ${result[0]['admin']}, (1=admin, 0=NO)`);
                    res.json({ message: 'IS ADMIN', powerLevel: 9999 });
                } else {
                    console.log('admin is NULL and array.lengh is 1 !!!!');
                }
            }
            // res.json({message: 'ok', result: result});
        });
    },


    // ============= DESTROY SESSION =============
    destroySession: (req, res) => {
        console.log('userController > destroySession()');
        req.session.destroy(function (err) {
            if (err) throw err;
            console.log('successfully CLEARED SESSION');
            res.json({message: "Success"});
        });
        console.log('req.session after destroy =>'.yellow, req.session);
    }











    //---- EOF
}



