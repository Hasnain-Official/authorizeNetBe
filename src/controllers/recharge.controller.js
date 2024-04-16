require('dotenv').config();
const fileName = 'Recharge Wallet Controller';
const {successHandler, errorHandler} = require('../constants/constant');
const { logger } = require('../helpers/winston');
const { method } = require('../services/payment.service');

exports.authorizeCreditCard = async function(req, res) {
    try {
        const resp = await authorizeCreditCard(req.body); 
        return res.status(resp.status || 200).json(resp);
    } catch (err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    };
}