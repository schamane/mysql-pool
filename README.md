mysql-pool
==========

Простой эффективный и автономный пул открытых соединений к базе данных MySQL для драйвера [felixge/node-mysql v2.0](https://github.com/felixge/node-mysql)
##Текущая версия##
08.07.2012 v1.1.0 - добавлена автономная работа с октрытыми соеденениями (возращения в пул)
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
##Тест##
```javascript
var MySQLPool = require("./mysql-pool");
var pool = new MySQLPool({
    poolSize : 5,
    user : 'exchanger',
    password : '12345',
    database : 'test'
});

pool.getConnection(function(connection) {
    console.log('--- connection id #', connection.cid);
    console.log('for request #1\n\r');
    connection.query('SELECT 1', function (error, result) {
        if (error) {
            console.log(error);
            return;
        }; 
        console.log('connection id #',connection.cid);
        console.log('request #1 ------- Query 1\n\r');
        connection.query('SELECT 1', function (error, result) {
            if (error) {
                onsole.log(error);
                return;
            }; 
            console.log('connection id #',connection.cid);
            console.log('request #1 ------- Query 1A\n\r');
        }); 
    });
    
    connection.query('SELECT 1', function (error, result) {
        if (error) {
            console.log(error);
            return;
        }; 
        console.log('connection id #',connection.cid);
        console.log('request #1 ------- Query 2\n\r');
        connection.query('SELECT 1', function (error, result) {
            if (error) {
                onsole.log(error);
                return;
            }; 
            console.log('connection id #',connection.cid);
            console.log('request #1 ------- Query 2A\n\r');
        }); 
    });
   
    connection.query('SELECT 1', function (error, result) {
        if (error) {
            console.log(error);
            return;
        }; 
        console.log('connection id #',connection.cid);
        console.log('request #1 ------- Query 3\n\r');
        connection.query('SELECT 1', function (error, result) {
            if (error) {
                onsole.log(error);
                return;
            }; 
            console.log('connection id #',connection.cid);
            console.log('request #1 ------- Query 3A\n\r');
        }); 
    });
    
    connection.query('SELECT 1', function (error, result) {
        if (error) {
            console.log(error);
            return;
        }; 
        console.log('connection id #',connection.cid);
        console.log('request #1 ------- Query 4\n\r');
        connection.query('SELECT 1', function (error, result) {
            if (error) {
                onsole.log(error);
                return;
            }; 
            console.log('connection id #',connection.cid);
            console.log('request #1 ------- Query 4A\n\r');
        }); 
    });
});

pool.getConnection(function(connection) {
    console.log('--- connection id #', connection.cid);
    console.log('for request #2\n\r');
    connection.query('SELECT 1', function (error, result) {
        if (error) {
            console.log(error); 
            return;
        };
        console.log('connection id #',connection.cid);
        console.log('request #2 ------- Query 1\n\r');          
    });
    
    connection.query('SELECT 1', function (error, result) {
        if (error) {
            console.log(error); 
            return;
        };
        console.log('connection id #',connection.cid);
        console.log('request #2 ------- Query 2\n\r');          
    });
    
    connection.query('SELECT 1', function (error, result) {
        if (error) {
            console.log(error); 
            return;
        };
        console.log('connection id #',connection.cid);
        console.log('request #2 ------- Query 3\n\r');          
    });
    
    connection.query('SELECT 1', function (error, result) {
        if (error) {
            console.log(error); 
            return;
        };
        console.log('connection id #',connection.cid);
        console.log('request #2 ------- Query 4\n\r');          
    });
});

```
##Результат теста##
```
--- connection id # 2
for request #1

--- connection id # 1
for request #2

connection id # 2
request #1 ------- Query 1

connection id # 1
request #2 ------- Query 1

connection id # 2
request #1 ------- Query 2

connection id # 1
request #2 ------- Query 2

connection id # 2
request #1 ------- Query 3

connection id # 1
request #3 ------- Query 3

connection id # 2
request #1 ------- Query 4

connection id # 1
request #4 ------- Query 4

connection id # 2
request #1 ------- Query 1A

connection id # 2
request #1 ------- Query 2A

connection id # 2
request #1 ------- Query 3A

connection id # 2
request #1 ------- Query 4A

```