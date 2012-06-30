module.exports = function (properties) {
    var self = this;
    var mysql = require('mysql');
    var poolSize = 1;
    var parameters = {};
    var connectionPool = [];
    var mainQueue = [];
    /* Инициализация пула */
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
        var connection = connectionPool.pop(); // Выбираем с конца массива соединение
        if (connection) {
            callback(connection); 
        } else { // Если свободных соединений в пуле нет, ставим в очередь
            mainQueue.push(callback);
            console.log('set queue');
        };
    };

    this.resume = function(connection) {
        connectionPool.push(connection); // Возращаем использованное соединение в пул добавляя его в конец массива
        if (mainQueue.length) { // Если ли очередь?
            process.nextTick(function () {
                console.log('get queue'); 
                self.getConnection(mainQueue.shift()); // Вызываем очередь
            });
        };
    };
};