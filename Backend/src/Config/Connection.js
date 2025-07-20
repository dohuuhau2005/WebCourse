const sql = require('mssql')
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_User,
    password: process.env.DB_Password,
    server: process.env.DB_Server,
    database: process.env.DB_Name,
    options: {
        encrypt: true, // bắt buộc nếu dùng Azure
        trustServerCertificate: true, // cần thiết cho local SQL Server
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }

};
let pool;
const connection = async () => {
    try {
        if (!pool) {
            pool = await sql.connect(dbConfig);
            console.log("connected")
        }
    }
    catch (err) {
        console.log('can not connect')
        throw err;
    }
}
module.exports = { connection };