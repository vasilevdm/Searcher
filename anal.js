const conf = require('./conf.js')
var fetch = require("node-fetch");

const appId = conf.appId; // from ebay dev console
// const keywords = 'x1+carbon+i5%205'; // what we need
// const keywords = 'thinkpad+x1+6200U'; // what we need
const keywords = 'T470'; // what we need
// const keywords = 'T460S'; // what we need
const categoryId = '175672'; // category PC Laptops & Netbooks
let filters = [
	'itemFilter(0).name=ListingType',
	'itemFilter(0).value(0)=Auction',
	'itemFilter(0).value(1)=AuctionWithBIN',

	'itemFilter(1).name=Condition',
	'itemFilter(1).value(0)=1000', //New
	'itemFilter(1).value(1)=1500', //New other (see details)
	'itemFilter(1).value(2)=1750', //New with defects
	'itemFilter(1).value(3)=2000', //Manufacturer refurbished
	'itemFilter(1).value(4)=2500', //Seller refurbished
	'itemFilter(1).value(5)=3000', //Used
	'itemFilter(1).value(6)=4000', //Very Good
	'itemFilter(1).value(7)=5000', //Good
	'itemFilter(1).value(8)=6000', //Acceptable
	// 'itemFilter(1).value(9)=7000', //For parts or not working

	'itemFilter(2).name=MinBids',
	'itemFilter(2).value(0)=2',

	'itemFilter(3).name=MaxPrice',
	'itemFilter(3).value(0)=2000',
	// 'itemFilter(3).paramName=Currency',
	// 'itemFilter(3).paramValue=USD',
];
filters = '&'+filters.join('&');
// const filters = '&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&itemFilter(2).name=SoldItemsOnly&itemFilter(2).value=true';
const sort = '';
// const sort = '&sortOrder=PricePlusShippingLowest';

const endpoint = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findCompletedItems&SERVICE-VERSION=1.7.0&SECURITY-APPNAME='+appId+'&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords='+keywords+'&categoryId='+categoryId+filters+sort+'&paginationInput.entriesPerPage=100';

const makeCall = async (endpoint) => {
	response = await fetch(endpoint);
	try {
	    // console.log(response);
	    if(response.ok) {
	        const jsonResponse = await response.json();
	        const items_list = jsonResponse.findCompletedItemsResponse[0].searchResult[0].item;
	        let sum = 0;

	        if(items_list) {
		        items_list.forEach(item => {
		        	const cost = Number(item.sellingStatus[0].currentPrice[0].__value__);
		        	const date = new Date(item.listingInfo[0].endTime[0]);
		        	console.log(Math.round(cost)+'$ : '+date.toDateString()+' : '+item.viewItemURL);
		        	// console.log(Math.round(cost)+'$ : '+date.toDateString()+' : '+item.title+' : '+item.viewItemURL);
		        	sum += cost;
		        });
		        console.log('average: '+Math.round(sum/items_list.length)+'$');

		        const result_json = JSON.stringify(items_list);
		        // console.log(result_json);
	      	} else {
	      		console.log('empty result');
	      	}
	    }
	} catch(error) {
	    console.log(error);
	}
}

console.log('');
console.log(keywords);
makeCall(endpoint);