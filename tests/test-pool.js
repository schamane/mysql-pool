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
                console.log(error);
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
                console.log(error);
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
                console.log(error);
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
                console.log(error);
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