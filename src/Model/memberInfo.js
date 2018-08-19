/**
 * http://usejsdoc.org/
 */
//connect to mysql server 	
const mysql = require('mysql');

const pool = mysql.createPool({
	host : 'localhost',
	port : 3306,
	user : 'root',
	password : 'lee023',
	database : 'bbn_db',
	insecureAuth : true});

exports.findMember = function(data, callback) {
	let memberInfo = {};
	let sql = 'SELECT mem_id FROM user WHERE mem_email = ?';

	  // get a connection from the pool
	  pool.getConnection(function(err, connection) {
	    if(err) { console.log(err); callback(true); return; }
	    // make the query
	    connection.query(sql, data.mem_email, function(err, results) {
	      connection.release();
	      if(err) { console.log(err); callback(true); return; }
	      callback(false, results);
	    });
	  });
	};
