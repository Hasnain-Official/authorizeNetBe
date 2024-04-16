const { paymentDescriptor } = require('../constants/constant');

const apiContracts = require('authorizenet').APIContracts;
const apiControllers = require('authorizenet').APIControllers;

const apiLoginKey = process.env.apiLoginKey;
const transactionKey = process.env.transactionKey;
const paymentDataValue = process.env.paymentDataValue;

async function createGooglePayTransaction() {
    return new Promise((resolve, reject) => {
        let merchantAuthenticationType = new apiContracts.MerchantAuthenticationType();
        merchantAuthenticationType.setName(apiLoginKey);
        merchantAuthenticationType.setTransactionKey(transactionKey);

        let opaqueData = new apiContracts.OpaqueDataType();
        opaqueData.setDataDescriptor(paymentDescriptor.google);
        opaqueData.setDataValue(paymentDataValue);

        let payment = new apiContracts.PaymentType();
        payment.setOpaqueData(opaqueData);

        let lineItem = new apiContracts.LineItemType();
        lineItem.setItemId("1");
        lineItem.setName("vase");
        lineItem.setDescription("Cannes logo");
        lineItem.setQuantity(18);

        let lineItemsArray = new apiContracts.ArrayOfLineItem();
        lineItemsArray.setLineItem(lineItem);

        let tax = new apiContracts.ExtendedAmountType();
        tax.setName("level2 tax name");
        tax.setDescription("level2 tax");

        let userFields = new apiContracts.TransactionRequestType.UserFields();

        let userField1 = new apiContracts.UserField();
        userField1.setName("UserDefinedFieldName1");
        userField1.setValue("UserDefinedFieldValue1");

        let userField2 = new apiContracts.UserField();
        userField2.setName("UserDefinedFieldName2");
        userField2.setValue("UserDefinedFieldValue2");

        userFields.setUserField([userField1, userField2]);

        let transactionRequest = new apiContracts.TransactionRequestType();
        transactionRequest.setTransactionType(apiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION);
        transactionRequest.setPayment(payment);
        transactionRequest.setLineItems(lineItemsArray);
        transactionRequest.setTax(tax);
        transactionRequest.setUserFields(userFields);

        let createRequest = new apiContracts.CreateTransactionRequest();
        createRequest.setTransactionRequest(transactionRequest);
        createRequest.setMerchantAuthentication(merchantAuthenticationType);

        let ctrl = new apiControllers.CreateTransactionController(createRequest.getJSON());

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

module.exports.createGooglePayTransaction = createGooglePayTransaction;