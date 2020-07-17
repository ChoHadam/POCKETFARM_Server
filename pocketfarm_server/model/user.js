const pool = require('../module/db/pool');
const table = 'User';

const user = {
    checkUser : async (userId) => {
        //존재하는 회원인지 확인
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE userId = "${userId}"`);
        return result;
    },
    returnUser : async (userIdx) => {
        // userIdx에 해당하는 유저 정보 반환
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE userIdx = ${userIdx}`);
        return result;
    },
}

module.exports = user;