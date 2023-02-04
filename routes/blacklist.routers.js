const Router = require('express');
const router = new Router();
const blc = require('../controllers/blackList.controller');

router.get('/blackList', blc.getBlackList);
router.post('/addUser', blc.addUserToBlackList);
router.post('/deleteUserFromBl', blc.deleteFromBlackList);

module.exports = router;