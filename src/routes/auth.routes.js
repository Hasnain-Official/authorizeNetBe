const router = require("express").Router();

router.get('/', (req, res) => {
    console.log("This is Auth Route");
    return res.send({status : 200, message : 'Auth Routes'});
});

module.exports = router;