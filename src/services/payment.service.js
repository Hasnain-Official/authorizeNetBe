const { paymentDescriptor } = require("../constants/constant");
const { createApplePayTransaction } = require('../payments/apple.pay');
const { createGooglePayTransaction } = require('../payments/google.pay');

const callback = function(response) {
    console.log("Response - > ",  response);
}

exports.method = async function(body) {
    const {createTransactionRequest : {transactionRequest : {payment : {opaqueData : {dataDescriptor, dataValue}}}}} = body?.requestData;
    let data = {};
    if(!dataDescriptor ) {
        return {status : 404, message : 'Bad Request'};
    }
    if(dataDescriptor == paymentDescriptor.apple) {
        data = await createApplePayTransaction(body, callback);
        if(data?.messages?.resultCode == 'Error') {
            return { status : 400, message : 'Error Occurred', error : data?.messages?.message };
        }
        return {status : 200, message : 'Response from method', data : data};
        
    } else if(dataDescriptor == paymentDescriptor.google) {
        data = await createGooglePayTransaction(body, callback);
        if(data?.messages?.resultCode == 'Error') {
            return { status : 400, message : 'Error Occurred', error : data?.messages?.message };
        }
        return {status : 200, message : 'Response from method', data : data};
    } else {
        return { status : 400, message : 'Invalid method for payment', data : data};
    }
}