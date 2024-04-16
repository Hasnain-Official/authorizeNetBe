const { successHandler } = require("../constants/constant");

exports.adminLogin = async function() {
    return {status : 200, message : successHandler.login, data : {}};
}