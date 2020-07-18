const pool = require('../module/db/pool');
//const moment = require('moment');
//const moment_timezone = require('moment-timezone');
const table1 = 'User';
const table2 = 'Board';
const table3 = 'Farm';
const table4 = 'Reservation';
const table5 = 'Donation';
const table6 = 'Review';

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
    readFarm: async(boardIdx) => {
        const fields = 'farmImg, farmContent,name, userImg, description';
        const result = await pool.queryParam_None(`SELECT ${fields} FROM ${table2} NATURAL JOIN ${table3} NATURAL JOIN ${table1} WHERE boardIdx = ${boardIdx}`)
        return result;
    },
    reserve: async(json) => {
        const fields = 'amount, price, ea, donatePoint, baeminPoint, userIdx, boardIdx';
        const questions = `"${json.amount}", "${json.price}", "${json.ea}", "${json.donatePoint}", ${json.baeminPoint}, ${json.userIdx}, ${json.boardIdx}`;
        let result = await pool.queryParam_None(`INSERT INTO ${table4}(${fields}) VALUES(${questions})`);
        return result;
    },
    updateDonations: async(donatePointInt) => {
        const result = await pool.queryParam_None(`UPDATE ${table5} SET currentPrice = currentPrice + ${donatePointInt} WHERE donationIdx = 1`)
        return result;
    },
    updateCurrentAmount: async(json) => {
        const result = await pool.queryParam_None(`UPDATE ${table2} SET currentAmount = currentAmount + ${json.totalAmount} WHERE boardIdx = ${json.boardIdx}`)
        return result;
    },
    readReviews: async(boardIdx) => { 
        const fields = 'reviewIdx, reviewImg, reviewContent, starScore, nickname, userId, AVG(starScore) AS averageScore'
        const result = await pool.queryParam_None(`SELECT ${fields}  FROM ${table6} NATURAL JOIN ${table1} WHERE boardIdx = ${boardIdx} GROUP BY reviewIdx`)
        return result;
    },                     
};