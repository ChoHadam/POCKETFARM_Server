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

// 게시글 상품 상세 조회
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

// 게시글 상품 소개 조회
router.get("/goods/:boardIdx", async(req, res) => {
    const boardIdx = req.params.boardIdx;

    if(!boardIdx)
    {
    res.status(statusCode.BAD_REQUEST).send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    return;
    }

    var result = await Board.readGoods(boardIdx);

    if(result.length == 0)
    {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BOARD_READ_FAIL));
    return;
    }

    res.status(statusCode.OK).send(utils.successTrue(statusCode.OK,responseMessage.BOARD_READ_SUCCESS, result[0]));
});

// 게시글 농장 소개 조회
router.get("/farm/:boardIdx", async(req, res) => {
    const boardIdx = req.params.boardIdx;

    if(!boardIdx)
    {
    res.status(statusCode.BAD_REQUEST).send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
    return;
    }

    var result = await Board.readFarm(boardIdx);

    if(result.length == 0)
    {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BOARD_READ_FAIL));
    return;
    }

    res.status(statusCode.OK).send(utils.successTrue(statusCode.OK,responseMessage.BOARD_READ_SUCCESS, result[0]));
});

//예약하기
router.post('/reserve/boardIdx/:boardIdx/userIdx/:userIdx', async (req, res) => {
    var {amount, price, ea, donatePoint, baeminPoint} = req.body;
    const userIdx = req.params.userIdx;
    const boardIdx = req.params.boardIdx;


    if(!amount || !price || !ea || !donatePoint || !baeminPoint) {
        const missParameters = Object.entries({amount, price, ea, donatePoint, baeminPoint})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');

        res.status(statusCode.BAD_REQUEST).send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.X_NULL_VALUE(missParameters)));
        return;
    }
    
    const json = {amount, price, ea, donatePoint, baeminPoint, userIdx, boardIdx};

    var result = await Board.reserve(json);
    
    if(result.length == 0) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).send(utils.successFalse(statusCode.INTERNAL_SERVER_ERROR, responseMessage.BOARD_RESERVE_FAIL));
        return;
    }

    var donatePointInt = parseInt(donatePoint.replace(',','')) //가격(String타입)에 있는 콤마(,) 제거
    const result2 = await Board.updateDonations(donatePointInt); 
    //console.log(donatePointInt)

    var totalAmount = ea * amount
    const json2 = {totalAmount, boardIdx};
    const result3 = await Board.updateCurrentAmount(json2);
    //console.log(totalAmount)

    res.status(statusCode.OK).send(utils.successTrue(statusCode.OK, responseMessage.BOARD_RESERVE_SUCCESS, result[0]));
});

module.exports = router;