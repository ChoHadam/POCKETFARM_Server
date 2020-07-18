const express = require('express');
const router = express.Router({mergeParams: true});

const utils = require('../../module/utils/utils');
const responseMessage = require('../../module/utils/responseMessage');
const statusCode = require('../../module/utils/statusCode');

const User = require('../../model/user');
const Board = require('../../model/board');

// 게시글 전체 보기(인기순 정렬)
router.get("/boardAll", async (req, res) => {
    let result = await Board.readAll();

    if(result == -1) //요청 페이지 초과했을 때
    {
        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.BOARD_PAGE_EXCESS));
        return;
    }
    else if(result == -2) //게시물 결과가 하나도 없을 때
    {
        res.status(statusCode.OK).send(utils.successTrue(statusCode.OK,responseMessage.BOARD_EMPTY, null));
        return;
    }
    

    if(result.length == 0) //디비 내부 오류
    {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BOARD_READ_ALL_FAIL));
        return;
    }

    res.status(statusCode.OK).send(utils.successTrue(statusCode.OK,responseMessage.BOARD_READ_ALL_SUCCESS, result));
});

// 게시글 하나 보기
router.get("/:boardIdx", async(req, res) => {
    const boardIdx = req.params.boardIdx;

    if(!boardIdx)
    {
    res.status(statusCode.BAD_REQUEST).send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    return;
    }

    var result = await Board.read(boardIdx);

    if(result.length == 0)
    {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BOARD_READ_FAIL));
    return;
    }

    //const goalAmount = result[0].goalAmount
    //const currentAmount = result[0].currentAmount
    //const goalRate = currentAmount / goalAmount * 100

    res.status(statusCode.OK).send(utils.successTrue(statusCode.OK,responseMessage.BOARD_READ_SUCCESS, result[0]));
});

module.exports = router;