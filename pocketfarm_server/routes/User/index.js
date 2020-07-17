const express = require('express');
const router = express.Router({mergeParams: true});

router.use('/signin', require('./signin'));

module.exports = router;