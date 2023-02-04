const Router = require('express');
const router = new Router();
const blc = require('../controllers/blackList.controller');

router.get('/blackList', blc.getBlackList);

module.exports = router;