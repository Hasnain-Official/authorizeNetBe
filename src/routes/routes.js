const router = require('express').Router();
const authRoutes = require('./auth.routes');
const paymentRoutes = require("./payment.routes");
const rechargeWalletRoutes = require('./recharge.routes');

// Default Route
router.get("/", (req, res) => {
    return res.send({status : 200, message : `Default Route.`});
});

// auth routes
router.use('/auth', authRoutes);

// payment routes
router.use("/pay", paymentRoutes);

// recharge card routes
router.use('/recharge', rechargeWalletRoutes);

module.exports = router;