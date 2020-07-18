const pool = require('../module/db/pool');
const table1 = 'Donation';

module.exports = {
    readDonation: async() => {
        const fields = 'goalPrice, currentPrice';
        const result = await pool.queryParam_None(`SELECT ${fields} FROM ${table1}`)
        return result;
    },
};