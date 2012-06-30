mysql-pool
==========

Простой и эффективный пул открытых соединений к базе данных MySQL для драйвера [felixge/node-mysql v2.0](https://github.com/felixge/node-mysql)

##Пример работы с модулем##
```javascript
var MySQLPool = require('mysql-pool');
var pool = new MySQLPool({
  sizePool : 5,
  user : 'username',
  password : 'password',
  database : 'test'
});

pool.getConnection(function(connection) { // Получаем свободное соединение из пула
  connection.query('SELECT...', function (error, result) {
    if (error) {
       pool.resume(connection); // При возникновении ошибки так же явно надо вернуть соединение в пул.
    } else {
       pool.resume(connection); // Отдаем соединение обратно в пул  
    }
    });
});
```