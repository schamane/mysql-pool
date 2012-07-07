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
/* Пример с одним запросом в бд */
pool.getConnection(function(connection) { // Получаем свободное соединение для передачи запроса
  connection.query('SELECT...', function (error, result) {
    pool.resume(connection); // Запрос выполнен, возращаем соединения в пул
    if (error) {
       console.log(error);
       return;
    }
    console.log(result); // работаем с результатом
    });
});

/* Пример с вложенными запросами в бд */
pool.getConnection(function(connection) { // Получаем свободное соединение для передачи запроса
  connection.query('SELECT...', function (error, result) {
    if (error) {
       pool.resume(connection); // Если ошибка возращаем соединения
       console.log(error);
       return;
    }
    console.log(result); // работаем с результатом
    connection.query('SELECT...', function (error, result) {
       if (error) {
          pool.resume(connection); // Если ошибка возращаем соединения
          console.log(error);
          return;
       }
       console.log(result); // работаем с результатом
       connection.query('SELECT...', function (error, result) {
       if (error) {
          pool.resume(connection); // Если ошибка возращаем соединения
          console.log(error);
          return;
       }
       pool.resume(connection); // Отдаем соединения в пул
       console.log(result); // работаем с результатом
    });
    });
  });
});
```