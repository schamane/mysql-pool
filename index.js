module.exports = function (properties) {
    var mysql = require('mysql');
    var poolSize = 1;
    var parameters = {};
    var connectionPool = [];
    var mainQueue = [];

    (function () {
        for (var key in properties) {
            switch (key) {
                case 'poolSize' : {
                    poolSize = properties[key]; 
                    break;
                };
                default : {
                    parameters[key] = properties[key];
                };
            };
        };
        for (var x = 0; x < poolSize; x ++) {
            connectionPool.push(mysql.createConnection(parameters));
        };
    })();

    this.getConnection = function(callback) {
        if (connectionPool.length) {
            callback(connectionPool.pop());
        } else { 
            mainQueue.push(callback);
        };
    };

    this.resume = function(connection) {
        connectionPool.push(connection);
        if (mainQueue.length) {
            process.nextTick(function (
                this.getConnection(mainQueue.shift());
            }.bind(this));
        };
    };
};