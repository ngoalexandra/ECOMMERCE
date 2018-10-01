console.log("SERVER > sql.js".blue);

//sql connection
var mysql = require("mysql");
connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: 'UserSQL_DB'
});
