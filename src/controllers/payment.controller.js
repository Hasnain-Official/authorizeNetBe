require('dotenv').config();
const fileName = 'Payment Controller';
const {successHandler, errorHandler} = require('../constants/constant');
const { logger } = require('../helpers/winston');
const { method } = require('../services/payment.service');

exports.method = async function(req, res) {
    try {
        const resp = await method(req.body); 
        return res.status(resp.status || 200).json(resp);
    } catch (err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    };
}