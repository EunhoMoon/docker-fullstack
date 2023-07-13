const mysql = require('mysql2');
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  // database: MYSQL_DATABASE,
  prort: MYSQL_PORT,
});
exports.pool = pool;
