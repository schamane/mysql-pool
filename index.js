module.exports = function (properties) {
    var self = this;
    var mysql = require('mysql');
    var connectionPool = [];
    var mainQueue = [];
   
    (function () {
       var poolSize = properties.poolSize;
       delete properties.poolSize;
       for (var x = 0; x < poolSize; x += 1) {
           connectionPool.push({ 
               connection : mysql.createConnection(properties),
               cid : x // id соединения для дебага
           });
       };
    })();

    var resumeConnection = function(connection) {
        delete connection.query;  
        connectionPool.push(connection);
        if (mainQueue.length) { 
            process.nextTick(function () {
                self.getConnection(mainQueue.shift());
            });
        };
    };

    this.getConnection = function(callback) {
        var connection;
        if (connectionPool.length) { 
            connection = connectionPool.pop(); 
            connection.query = function (sql, params, callback) { 
                if (typeof params == "function") {
                    callback = params;
                    params = undefined;
                };
                this.connection.query(sql, params || [], function() { 
                    if (arguments[0] !== null) 
                        resumeConnection(this);
                    if (this.connection._protocol._queue.length == 1) // Проверяем внутреннию очередь для текущего соединения
                        resumeConnection(this);   
                    if (callback) 
                        callback.apply(this.connection, arguments); 
                }.bind(this));
            };
            callback(connection);
        } else {
            mainQueue.push(callback);
        };
    };
};

