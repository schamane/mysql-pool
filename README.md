mysql-pool
==========

Простой эффективный и автономный пул открытых соединений к базе данных MySQL для драйвера [felixge/node-mysql v2.0](https://github.com/felixge/node-mysql)
##Текущая версия##
1.1.0
##Пример работы с модулем##
```javascript
var MySQLPool = require('mysql-pool');
var pool = new MySQLPool({
  sizePool : 5,
  user : 'username',
  password : 'password',
  database : 'test'
});

pool.getConnection(function(connection) { 
  connection.query('SELECT...', function (error, result) {
    if (error) {
       console.log(error);
       return;
    }
    console.log(result); // работаем с результатом
    });
});
```