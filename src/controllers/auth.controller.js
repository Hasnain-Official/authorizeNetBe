require("dotenv").config();
const fileName = "Auth Controller";
const { successHandler, errorHandler } = require("../constants/constant");
const { logger } = require("../helpers/winston");

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns {}
 * @use 'Login for Admin'
 */
exports.adminLogin = async function(req, res) {
    try {
        const resp = await adminLogin();
        return res.status(resp.status || 200).json(resp);
    } catch(err) {
        logger.error({ message : `Error in ${fileName} `, Error : err });
        return res.status(500).json({ status: 500, message: errorHandler.somethingWentWrong });
    }
}