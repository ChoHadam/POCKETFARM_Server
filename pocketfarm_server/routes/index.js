var express = require('express');
var router = express.Router({mergeParams: true});


router.use('/user', require('./User'));
//router.use('/board', require('./Board'));
//router.use('/mypage', require('./Mypage'));
//router.use('/home', require('./Home'));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('"예약제로 신선하게, 내 손안의 착한 농장 Pocket Farm"에 오신걸 환영합니다!<br><br><br>- PocketFarmer Fam : 동원 종연 지혜 하담 창우');
});

module.exports = router;
