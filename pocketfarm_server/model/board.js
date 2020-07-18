const pool = require('../module/db/pool');
//const moment = require('moment');
//const moment_timezone = require('moment-timezone');
const table1 = 'User';
const table2 = 'Board';

module.exports = {
    readAll: async() => {
        const fields = 'boardIdx, boardImg, category, tag, title, price1, likeNum';
        const result = await pool.queryParam_None(`SELECT ${fields} FROM ${table2} ORDER BY likeNum desc`)
        return result;
    },
};