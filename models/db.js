var setting = require('../setting');
var db = require('mongodb').Db;
var connection = require('mongodb').Connection;
var server = require('mongodb').Server;

module.exports = new Db(setting.db,new Server(setting.host,connection.DEFAULT_PORT,{}));