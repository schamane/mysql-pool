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

    var resumeConnection = function(connection) { /* Функция возращает соединение в пул и активирует очередь */
        delete connection.query; /* Удаляем метод обертку у использованного соединения */
        connectionPool.push(connection); /* Соединение вернулось в пул и готова к исполнению новых запросов */
        if (mainQueue.length) { 
            process.nextTick(function () {
                self.getConnection(mainQueue.shift());
            });
        };
    };

    this.getConnection = function(callback) {
        if (connectionPool.length) { /* Проверяем пул на наличее свободных соединений */
            var connection = connectionPool.pop(); /* Берем соединение с конца (потомучто так быстрее) */
            connection.query = function (sql, params, callback) { /* Метод обертка для вызова оригинального метода query */
                if (typeof params == "function") {
                    callback = params;
                    params = undefined;
                };
                this.connection.query(sql, params || [], function() { /* Обертка оригинальноо колбэка, ядро пула */ 
                    if (arguments[0] !== null) 
                        resumeConnection(this);
                    if (this.connection._protocol._queue.length == 1) /* Проверяем внутреннию очередь для текущего соединения */
                        resumeConnection(this);   
                    if (callback) 
                        callback.apply(this.connection, arguments); 
                }.bind(this));
            };
            callback(connection); /* Передаем полученное соединение в функцию исполнения запросов */
        } else {
            mainQueue.push(callback); /* Иначе добавляем к очереди */
        };
    };
};

