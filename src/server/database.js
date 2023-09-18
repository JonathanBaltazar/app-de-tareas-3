import mysql from "mysql2";

import { DB_HOST, DB_USER, DB_PASS, DB_NAME } from "./config.js";

let pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
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
