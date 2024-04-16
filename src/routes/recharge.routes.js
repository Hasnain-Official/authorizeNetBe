const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).json({status : 200, message : 'Recharge card routes'});
});

router.post('/authorize/card');

module.exports = router;