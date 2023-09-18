import mysql from "mysql2";

let pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "test_db",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
});

let promisePool = pool.promise();

export default promisePool;
