const { method } = require('../controllers/payment.controller');

const router = require('express').Router();


// Default Payment Route
router.get("/", (req, res) => {
    return res.send({status : 200, message : `Payment Default Route.`});
});

router.post('/method', method);

module.exports = router;