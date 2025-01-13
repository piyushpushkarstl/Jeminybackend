const mysql = require('mysql2/promise');

async function testConnection() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'user',
            database: 'candidateprofile',
        });
        console.log('Connected to MySQL database!');
        await connection.end();
    } catch (err) {
        console.error('Error connecting to MySQL database:', err.message);
    }
}

testConnection();
