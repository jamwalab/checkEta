const router = require('express').Router();

const homepage = require('./homeRoute');
const trackCnroute = require('./trackCn-route');

router.use('/', homepage);
router.use('/trackCn', trackCnroute);

/* always comes last
router.get('*', (req,res) => {
});*/

module.exports  = router;