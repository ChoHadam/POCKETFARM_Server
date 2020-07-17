const express = require('express');
const router = express.Router({mergeParams: true});
const statusCode = require('../../module/utils/statusCode');
const responseMessage = require('../../module/utils/responseMessage');
const utils = require('../../module/utils/utils');
const User = require('../../model/user');

router.post('/', async(req, res) => {
    console.log("in")
    const {userId, password} = req.body;
    
    if(!userId || !password){ //비어있는지 검사
        const missParameters = Object.entries({userId, password})
        .filter(it => it[1] == undefined).map(it => it[0]).join(',');
        
        res
        .status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(statusCode.BAD_REQUEST, responseMessage.X_NULL_VALUE(missParameters)));
        return;
    }

    const userResult = await User.checkUser(userId);
    
    if(userResult.length == 0) { //존재하지 않는 데이터
        res
        .status(statusCode.BAD_REQUEST)
        .send(utils.successFalse(statusCode.NO_ID, responseMessage.NO_ID));
        return;
    } else {       
        if(password == userResult[0].password){
            const userIdx = userResult[0].userIdx;
            const name  = userResult[0].name;
            console.log(userIdx)
            
            const result = {userIdx, name};
            res
            .status(statusCode.OK)
            .send(utils.successTrue(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, result));
        } else { //비밀번호 불일지, 로그인 실패
            res
            .status(statusCode.MISS_PASSWORD)
            .send(utils.successFalse(statusCode.MISS_PASSWORD, responseMessage.MISS_MATCH_PW));
            return;
        }
    }
});

module.exports = router;