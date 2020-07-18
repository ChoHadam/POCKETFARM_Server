const express = require('express');
const router = express.Router({mergeParams: true});

const utils = require('../../module/utils/utils');
const responseMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');

const Mypage = require('../../model/mypage');

// 마이페이지 조회
router.get("/:userIdx", async(req, res) => {
    const userIdx = req.params.userIdx;

    if(!userIdx)
    {
    res.status(statusCode.BAD_REQUEST).send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    return;
    }

    var result = await Mypage.readInfo(userIdx);

    if(result.length == 0)
    {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.MYPAGE_READ_FAIL));
    return;
    }

    res.status(statusCode.OK).send(utils.successTrue(statusCode.OK,responseMessage.MYPAGE_READ_SUCCESS, result[0]));
});

module.exports = router;