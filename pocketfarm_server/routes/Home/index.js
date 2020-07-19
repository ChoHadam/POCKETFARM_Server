const express = require('express');
const router = express.Router({mergeParams: true});

const utils = require('../../module/utils/utils');
const responseMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');

const Home = require('../../model/home');

//기부 현황 조회
router.get("/donations", async (req, res) => {
    let result = await Home.readDonation();

    if(result == -2) //결과가 하나도 없을 때
    {
        res.status(statusCode.OK).send(utils.successTrue(statusCode.OK,responseMessage.BOARD_EMPTY, null));
        return;
    }
    

    if(result.length == 0) //디비 내부 오류
    {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.DONATION_READ_FAIL));
        return;
    }
    const goalPrice = result[0].goalPrice
    const goalPriceInt = goalPrice.replace(/,/g,'') // 계산을 위해 금액에서 콤마 제거
    
    const currentPrice = result[0].currentPrice
    const currentPriceInt = currentPrice.replace(/,/g,'') // 계산을 위해 금액에서 콤마 제거
    
    const archiveRate = Math.ceil(parseFloat(currentPriceInt) / parseFloat(goalPriceInt) * 100.00)

    finalResult = {goalPrice, currentPrice, archiveRate}

    res.status(statusCode.OK).send(utils.successTrue(statusCode.OK,responseMessage.DONATION_READ_SUCCESS, finalResult));
});
module.exports = router;