const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('invParser');
})

module.exports = router;
