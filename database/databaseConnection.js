var mysql = require('mysql');
var configs = require('../configs/configurations');

var connection = mysql.createConnection({
    host: configs.hostString,
    user: configs.userString,
    password: configs.passwordString,
    database: configs.databaseString
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('database connected');
});
module.exports = connection;