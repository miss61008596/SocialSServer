/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';

// database connect 应用启动时已经初始化完成

var host = '139.196.80.85';
var port = '8529';
var database = 'myapp';
var username = 'tester';
var password = 'cqmygysdss1987';

var db = require('arangojs')({
    url: 'http://' + username + ':' + password + '@' + host + ':' + port,
    databaseName: database
});

console.log('database');
// db.useDatabase('myapp');

//return
module.exports = db;