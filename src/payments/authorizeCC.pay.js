
let ApiContracts = require('authorizenet').APIContracts;
let ApiControllers = require('authorizenet').APIControllers;
let utils = require('../utils.js');
let constants = require('../constants.js');

function authorizeCreditCard(callback) {
	let merchantAuthenticationType = new ApiContracts.MerchantAuthenticationType();
	merchantAuthenticationType.setName(constants.apiLoginKey);
	merchantAuthenticationType.setTransactionKey(constants.transactionKey);

	let creditCard = new ApiContracts.CreditCardType();
	creditCard.setCardNumber('4242424242424242');
	creditCard.setExpirationDate('0835');
	creditCard.setCardCode('999');
    
	let paymentType = new ApiContracts.PaymentType();
	paymentType.setCreditCard(creditCard);

	let orderDetails = new ApiContracts.OrderType();
	orderDetails.setInvoiceNumber('INV-12345');
	orderDetails.setDescription('Product Description');

	let tax = new ApiContracts.ExtendedAmountType();
	tax.setAmount('4.26');
	tax.setName('level2 tax name');
	tax.setDescription('level2 tax');

	let duty = new ApiContracts.ExtendedAmountType();
	duty.setAmount('8.55');
	duty.setName('duty name');
	duty.setDescription('duty description');

	let shipping = new ApiContracts.ExtendedAmountType();
	shipping.setAmount('8.55');
	shipping.setName('shipping name');
	shipping.setDescription('shipping description');

	let billTo = new ApiContracts.CustomerAddressType();
	billTo.setFirstName('Ellen');
	billTo.setLastName('Johnson');
	billTo.setCompany('Souveniropolis');
	billTo.setAddress('14 Main Street');
	billTo.setCity('Pecan Springs');
	billTo.setState('TX');
	billTo.setZip('44628');
	billTo.setCountry('USA');

	let shipTo = new ApiContracts.CustomerAddressType();
	shipTo.setFirstName('China');
	shipTo.setLastName('Bayles');
	shipTo.setCompany('Thyme for Tea');
	shipTo.setAddress('12 Main Street');
	shipTo.setCity('Pecan Springs');
	shipTo.setState('TX');
	shipTo.setZip('44628');
	shipTo.setCountry('USA');

	let lineItem_id1 = new ApiContracts.LineItemType();
	lineItem_id1.setItemId('1');
	lineItem_id1.setName('vase');
	lineItem_id1.setDescription('cannes logo');
	lineItem_id1.setQuantity('18');
	lineItem_id1.setUnitPrice(45.00);

	let lineItem_id2 = new ApiContracts.LineItemType();
	lineItem_id2.setItemId('2');
	lineItem_id2.setName('vase2');
	lineItem_id2.setDescription('cannes logo2');
	lineItem_id2.setQuantity('28');
	lineItem_id2.setUnitPrice('25.00');

	let lineItemList = [];
	lineItemList.push(lineItem_id1);
	lineItemList.push(lineItem_id2);

	let lineItems = new ApiContracts.ArrayOfLineItem();
	lineItems.setLineItem(lineItemList);

	let userField_a = new ApiContracts.UserField();
	userField_a.setName('A');
	userField_a.setValue('Aval');

	let userField_b = new ApiContracts.UserField();
	userField_b.setName('B');
	userField_b.setValue('Bval');

	let userFieldList = [];
	userFieldList.push(userField_a);
	userFieldList.push(userField_b);

	let userFields = new ApiContracts.TransactionRequestType.UserFields();
	userFields.setUserField(userFieldList);

	let transactionSetting1 = new ApiContracts.SettingType();
	transactionSetting1.setSettingName('duplicateWindow');
	transactionSetting1.setSettingValue('120');

	let transactionSetting2 = new ApiContracts.SettingType();
	transactionSetting2.setSettingName('recurringBilling');
	transactionSetting2.setSettingValue('false');

	let transactionSettingList = [];
	transactionSettingList.push(transactionSetting1);
	transactionSettingList.push(transactionSetting2);

	let transactionSettings = new ApiContracts.ArrayOfSetting();
	transactionSettings.setSetting(transactionSettingList);

	let transactionRequestType = new ApiContracts.TransactionRequestType();
	transactionRequestType.setTransactionType(ApiContracts.TransactionTypeEnum.AUTHONLYTRANSACTION);
	transactionRequestType.setPayment(paymentType);
	transactionRequestType.setAmount(utils.getRandomAmount());
	transactionRequestType.setLineItems(lineItems);
	transactionRequestType.setUserFields(userFields);
	transactionRequestType.setOrder(orderDetails);
	transactionRequestType.setTax(tax);
	transactionRequestType.setDuty(duty);
	transactionRequestType.setShipping(shipping);
	transactionRequestType.setBillTo(billTo);
	transactionRequestType.setShipTo(shipTo);
	transactionRequestType.setTransactionSettings(transactionSettings);

	let createRequest = new ApiContracts.CreateTransactionRequest();
	createRequest.setMerchantAuthentication(merchantAuthenticationType);
	createRequest.setTransactionRequest(transactionRequestType);

	//pretty print request
	console.log(JSON.stringify(createRequest.getJSON(), null, 2));
		
	let ctrl = new ApiControllers.CreateTransactionController(createRequest.getJSON());

	ctrl.execute(function(){

		let apiResponse = ctrl.getResponse();

		let response = new ApiContracts.CreateTransactionResponse(apiResponse);

		//pretty print response
		console.log(JSON.stringify(response, null, 2));

		if(response != null){
			if(response.getMessages().getResultCode() == ApiContracts.MessageTypeEnum.OK){
				if(response.getTransactionResponse().getMessages() != null){
					console.log('Successfully created transaction with Transaction ID: ' + response.getTransactionResponse().getTransId());
					console.log('Response Code: ' + response.getTransactionResponse().getResponseCode());
					console.log('Message Code: ' + response.getTransactionResponse().getMessages().getMessage()[0].getCode());
					console.log('Description: ' + response.getTransactionResponse().getMessages().getMessage()[0].getDescription());
				}
				else {
					console.log('Failed Transaction.');
					if(response.getTransactionResponse().getErrors() != null){
						console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
						console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
					}
				}
			}
			else {
				console.log('Failed Transaction.');
				if(response.getTransactionResponse() != null && response.getTransactionResponse().getErrors() != null){
				
					console.log('Error Code: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorCode());
					console.log('Error message: ' + response.getTransactionResponse().getErrors().getError()[0].getErrorText());
				}
				else {
					console.log('Error Code: ' + response.getMessages().getMessage()[0].getCode());
					console.log('Error message: ' + response.getMessages().getMessage()[0].getText());
				}
			}
		}
		else {
			console.log('Null Response.');
		}

		callback(response);
	});
}

module.exports.authorizeCreditCard = authorizeCreditCard;