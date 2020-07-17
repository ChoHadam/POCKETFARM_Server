const mysql = require('promise-mysql')

const dbConfig = {
    host: 'db-pocketfarm-server.c5a29a6dqlhq.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'pocket123',
    database: 'pocketfarm',
    dateStrings: 'date',
}

module.exports = mysql.createPool(dbConfig)