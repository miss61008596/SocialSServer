/**
 * Created by zhubg on 2016/4/24.
 */

'use strict';


//permission to kill
var tokill = {tokill: ['_rev', '_id', '_key']};

//连接DB
var db = require('../util/database');

//userDao
function userDao( module, method, params) {
    //code

    //promise
    console.log('userDao');
    return dao[method](module, method, params);
}

//功能Dao--start--
let dao = {};

//getUserByOpenid
dao.getUserById = function ( module, method, params) {
    //some code
    console.log(JSON.stringify(params));
    console.log('userDao-getUserById');
    if (params.id) {
        let id = params.id;
        console.log('id:' + id);
        var AQL = `
        For i in user
            FILTER i.id == \'` + id + `\' 
            return UNSET(i,@tokill)
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL, tokill)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.openid Undefined!Check it!`;
    }
};

//getUserByCode
dao.getUserByCode = function (req, res, module, method, params) {
    //some code
    console.log(JSON.stringify(params));
    console.log('userDao-getUserByCode');
    if (params.code) {
        let code = params.code;
        console.log('code:' + code);
        var AQL = `
        For i in user
            FILTER i.code == \'` + code + `\' 
            return UNSET(i,@tokill)
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL, tokill)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.code Undefined!Check it!`;
    }
};

//insert
dao.insert = function (req, res, module, method, params) {
    //some code
    console.log('userDao-insert');
    if (params.user) {
        let user = JSON.stringify(params.user);
        var AQL = `
            INSERT ` + user + `
            IN user
            return NEW
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.user Undefined!Check it!`;
    }
};

//updateCode
dao.updateTokenById = function ( module, method, params) {
    //some code
    console.dir(params);
    console.log('userDao-updateTokenById');
    if (params.id && params.token) {
        let id = params.id;
        let token = params.token;
        console.log('id:' + id);
        console.log('token:' + token);
        var AQL = `
        For i in user
            FILTER i.id == \'` + id + `\' 
            UPDATE i WITH {publishtoken: \'` + token + `\' } IN user
            return UNSET(NEW,@tokill)
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL, tokill)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.openid or params.code Undefined!Check it!`;
    }
};

//update
dao.update = function (req, res, module, method, params) {
    //some code
    console.log(JSON.stringify(params));
    console.log('userDao-update');
    if (params.user) {
        let openid = params.user.openid;
        console.log('openid:' + openid);
        var AQL = `
        For i in user
            FILTER i.openid == \'` + openid + `\' 
            UPDATE i WITH ` + JSON.stringify(params.user) + ` IN user
            return UNSET(i,@tokill)
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL, tokill)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.openid Undefined!Check it!`;
    }
};


//edit
dao.edit = function (req, res, module, method, params) {
    //some code

    //promise
    return 'edit';
};

//move
dao.move = function (req, res, module, method, params) {
    console.log('userDao-move');

    //returns an array of result.
    return db.query(
        `
            For i in five
            limit 0,100
            return i
            `)
        .then((cursor)=> {
            return cursor.all()
        })

};

//deleteUserByOpenid
dao.deleteUserByOpenid = function (req, res, module, method, params) {
    //some code
    if (params.openid) {
        let openid = params.openid;
        var AQL = `
            FOR u IN user
            FILTER u.openid == '` + openid + `'
            REMOVE u IN user
            RETURN OLD
        `;
        console.log('AQL:' + AQL);

        //promise
        return db.query(AQL)
            .then((cursor)=> {
                return cursor.all()
            });
    } else {
        throw `params.user Undefined!Check it!`;
    }
};

//queryAql
dao.queryAql = function (req, res, module, method, params) {
    //some code

    console.log('userDao-queryAql');
    var aqlStr = '199';
    console.log('aqlStr:' + aqlStr);
    var AQL = `
        For i IN five 
        FILTER i.value == \'199\' 
        UPDATE i WITH { value: '250'} IN five 
        return UNSET(NEW,@tokill)
        `;
    console.log('AQL:' + AQL);
    //returns an array of result.
    return db.query(AQL, tokill)
        .then((cursor)=> {
            return cursor.all()
        });
};
//功能Dao---end---

//return
module.exports = userDao;