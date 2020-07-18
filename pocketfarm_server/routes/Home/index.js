const express = require('express');
const router = express.Router({mergeParams: true});

const utils = require('../../module/utils/utils');
const responseMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');

const Home = require('../../model/home');

//기부 현황 조회
router.get("/donations", async (req, res) => {
    let result = await Home.readDonation();

    if(result == -1) //요청 페이지 초과했을 때
    {
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.BOARD_PAGE_EXCESS));
        return;
    }
    else if(result == -2) //결과가 하나도 없을 때
    {
        res.status(statusCode.OK).send(utils.successTrue(statusCode.OK,responseMessage.BOARD_EMPTY, null));
        return;
    }
    

    if(result.length == 0) //디비 내부 오류
    {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BOARD_READ_ALL_FAIL));
        return;
    }
    const goalPrice = result[0].goalPrice
    const currentPrice = result[0].currentPrice
    const archiveRate = parseInt(currentPrice) / parseInt(goalPrice) * 100 +1

    finalResult = {goalPrice, currentPrice, archiveRate}

    res.status(statusCode.OK).send(utils.successTrue(statusCode.OK,responseMessage.BOARD_READ_ALL_SUCCESS, finalResult));
});

module.exports = router;