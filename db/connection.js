var fs = require('fs');
var mysql = require("mysql");
require("dotenv").config();

if (process.env.NODE_ENV == "production") {
  var pool = mysql.createConnection({
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_DB_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true,
    ssl: {
      ca: fs.readFileSync(process.env.MYSQL_SSL_CA_FILE),
      key: fs.readFileSync(process.env.MYSQL_SSL_KEY_FILE),
      cert: fs.readFileSync(process.env.MYSQL_SSL_CERT_FILE)
    }
  });
} else {
  var pool = mysql.createConnection({
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_DB_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    multipleStatements: true,
  });
}

module.exports = {
  connectionPool: pool,
};
