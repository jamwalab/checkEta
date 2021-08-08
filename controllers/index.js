const router = require('express').Router();

const apiRoutes = require('./api');
const htmlRoutes = require('./html');

router.use('/api', apiRoutes);
router.use('/', htmlRoutes);

//If endpoint doesn't exist, return 404
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;