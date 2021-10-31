const router = require('express').Router();

const homepage = require('./homeRoute');
const trackCnroute = require('./trackCn-route');
const portEtaroute = require('./portEta-route');
const invParser = require('./invParser-route');

router.use('/', homepage);
router.use('/trackCn', trackCnroute);
router.use('/portEta', portEtaroute);
router.use('/parser', invParser);

/* always comes last
router.get('*', (req,res) => {
});*/

module.exports  = router;