var MySQLPool = require("./db-pool");
var pool = new MySQLPool({
    poolSize : 3,
    user : 'root',
    password : '12345',
    database : 'futs'
});

pool.getConnection(function(connection) {
    console.log('--- connection id #', connection.cid);
    console.log('for request #1\n\r');
    connection.query('SELECT 1', function (error, result) {
        if (error) {
            console.log(error); 
        } else {
            console.log('connection id #',connection.cid);
            console.log('request #1 ------- Query 1\n\r');
            connection.query('SELECT 1', function (error, result) {
                if (error) {
                    console.log(error); 
                } else {
                    console.log('connection id #',connection.cid);
                    console.log('request #1 ------- Query 1A\n\r');
                };
            }); 
        };
    });
   
    connection.query('SELECT 2', function (error, result) {
        if (error) {
            console.log(error); 
        } else {
            console.log('connection id #',connection.cid);
            console.log('request #1 ------- Query 2\n\r');
            connection.query('SELECT 1', function (error, result) {
                if (error) {
                    console.log(error); 
                } else {
                    console.log('connection id #',connection.cid);
                    console.log('request #1 ------- Query 2A\n\r');
                };
            });
        };
    });
 
    connection.query('SELECT 3', function (error, result) {
        if (error) {
            console.log(error); 
        } else {
            console.log('connection id #',connection.cid);
            console.log('request #1 ------- Query 3\n\r');
            connection.query('SELECT 1', function (error, result) {
                if (error) {
                    console.log(error); 
                } else {
                    console.log('connection id #',connection.cid);
                    console.log('request #1 ------- Query 3A\n\r');
                };
            });
        };
    });

    connection.query('SELECT 4', function (error, result) {
        if (error) {
            console.log(error); 
        } else {
            console.log('connection id #',connection.cid);
            console.log('request #1 ------- Query 4\n\r');
            connection.query('SELECT 1', function (error, result) {
                if (error) {
                    console.log(error); 
                } else {
                    console.log('connection id #',connection.cid);
                    console.log('request #1 ------- Query 4A\n\r');
                };
            });
        };
    });
});

pool.getConnection(function(connection) {
    console.log('--- connection id #', connection.cid);
    console.log('for request #2\n\r');
    connection.query('SELECT 1', function (error, result) {
        if (error) {
            console.log(error); 
        } else {
            console.log('connection id #',connection.cid);
            console.log('request #2 ------- Query 1\n\r');
            
        };
    });
   
    connection.query('SELECT 2', function (error, result) {
        if (error) {
            console.log(error); 
        } else {
            console.log('connection id #',connection.cid);
            console.log('request #2 ------- Query 2\n\r');
        };
    });
    //console.log(connection._protocol._queue);
    connection.query('SELECT 3', function (error, result) {
        if (error) {
            console.log(error); 
        } else {
            console.log('connection id #',connection.cid);
            console.log('request #3 ------- Query 3\n\r');
        };
    });
    connection.query('SELECT 4', function (error, result) {
        if (error) {
            console.log(error); 
        } else {
            console.log('connection id #',connection.cid);
            console.log('request #4 ------- Query 4\n\r');
        };
    });
    
});

