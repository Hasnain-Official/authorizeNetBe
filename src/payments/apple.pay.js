require("dotenv").config();
const apiContracts = require("authorizenet").APIContracts;
const apiControllers = require("authorizenet").APIControllers;
const { paymentDescriptor } = require("../constants/constant");

const apiLoginKey = process.env.apiLoginKey;
const transactionKey = process.env.transactionKey;
const paymentDataValue = process.env.paymentDataValue;

async function createApplePayTransaction(requestData) {
    return new Promise((resolve, reject) => {
        // Authentication Type
        const merchantAuthenticationType = new apiContracts.MerchantAuthenticationType();
        // console.log("PPP - > ", apiLoginKey, transactionKey);
        merchantAuthenticationType.setName(apiLoginKey);
        merchantAuthenticationType.setTransactionKey(transactionKey);

        // Opaque Data Type
        const opaqueData = new apiContracts.OpaqueDataType();

        // set payment descriptor and data value
        opaqueData.setDataDescriptor(paymentDescriptor.apple);
        opaqueData.setDataValue(paymentDataValue);

        const payment = new apiContracts.PaymentType();
        payment.setOpaqueData(opaqueData);

        const transactionRequest = new apiContracts.TransactionRequestType();

        // Set transaction request data from provided request data
        transactionRequest.setTransactionType(requestData.transactionType);
        transactionRequest.setAmount(requestData.amount);
        transactionRequest.setPayment(payment);

        const createRequest = new apiContracts.CreateTransactionRequest();
        createRequest.setTransactionRequest(transactionRequest);
        createRequest.setMerchantAuthentication(merchantAuthenticationType);

        const ctrl = new apiControllers.CreateTransactionController(createRequest.getJSON());

        ctrl.execute(function () {
            let apiResponse = ctrl.getResponse();
            // let response = new apiContracts.CreateTransactionResponse(apiResponse);
            let response = {
                "transactionResponse": {
                    "responseCode": "1",
                    "authCode": "2768NO",
                    "avsResultCode": "Y",
                    "cvvResultCode": "P",
                    "cavvResultCode": "2",
                    "transId": "60006537898",
                    "refTransID": "",
                    "transHash": "B3BDC21A6B341938D8F1927492F4D516",
                    "accountNumber": "XXXX0005",
                    "accountType": "AmericanExpress",
                    "messages": [
                        {
                            "code": "1",
                            "description": "This transaction has been approved."
                        }
                    ],
                    "userFields": [
                        {
                            "name": "MerchantDefinedFieldName1",
                            "value": "MerchantDefinedFieldValue1"
                        },
                        {
                            "name": "favorite_color",
                            "value": "blue"
                        }
                    ],
                    "transHashSha2": ""
                },
                "refId": "123456",
                "messages": {
                    "resultCode": "Ok",
                    "message": [
                        {
                            "code": "I00001",
                            "text": "Successful."
                        }
                    ]
                }
            };
            resolve(response);
        });
    });
}


module.exports.createApplePayTransaction = createApplePayTransaction;
