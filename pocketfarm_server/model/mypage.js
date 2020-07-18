const pool = require('../module/db/pool');
const table1 = 'User';

module.exports = {
    readInfo: async(userIdx) => {
        const fields = 'name, userImg';
        const result = await pool.queryParam_None(`SELECT ${fields} FROM ${table1} WHERE userIdx = ${userIdx}`)
        return result;
    },
};