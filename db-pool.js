module.exports = function (properties) {
    var self = this;
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
                    break;
                };
            };
        };
        for (var x = 0; x < poolSize; x ++) {
            connectionPool.push(mysql.createConnection(parameters));
        };
    })();

    this.getConnection = function(callback) {
        var connection = connectionPool.pop();
        if (connection) {
            callback(connection); 
        } else {
            mainQueue.push(callback);
            console.log('set queue');
        };
    };

    this.resume = function(connection) {
        connectionPool.push(connection);
        if (mainQueue.length) { 
            process.nextTick(function () {
                console.log('get queue'); 
                self.getConnection(mainQueue.shift())
            });
        };
    };
};