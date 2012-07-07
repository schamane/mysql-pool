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
    pool.resume(connection); // По завершению работы запроса к базе обязательно надо вернуть соединение обратно в пул
    if (error) {
       console.log(error); // При возникновении ошибки так же явно надо вернуть соединение в пул.
       return;
    }
    console.log(result); // работаем с результатом
    });
});
```