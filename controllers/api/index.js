const router = require('express').Router();

const trackCn = require('./trackCn');
const portEta = require('./portEta');

router.use('/trackCn', trackCn);
router.use('/portEta', portEta);

module.exports = router;