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
    read: async(boardIdx) => {
        const fields = 'boardImg, category, tag, title, price1, price2, price3, amount1, amount2, amount3, goalAmount, currentAmount, period, deliverDate';
        const result = await pool.queryParam_None(`SELECT ${fields} FROM ${table2} WHERE boardIdx = ${boardIdx}`)
        return result;
    },
    readGoods: async(boardIdx) => {
        const fields = 'goodsImg, goodsContent';
        const result = await pool.queryParam_None(`SELECT ${fields} FROM ${table2} WHERE boardIdx = ${boardIdx}`)
        return result;
    },
};