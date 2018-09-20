///import config
const conf = require('./conf.js')
//import fetch from "node-fetch";
var fetch = require("node-fetch");
//import firebase from "firebase";
var firebase = require("firebase");
// Initialize Firebase
firebase.initializeApp(conf.firebase);

const writeUserData = (itemId, itemData, keywords) => {
    const date = firebase.database.ServerValue.TIMESTAMP;
    let item = firebase.database().ref(`listings/${keywords}/${itemId}`);
    // let item = firebase.database().ref(`listings/${itemId}`);

    item.once('value', listing => {
        if(listing.exists()) {
            let data = listing.val();
            data.bidHistory.push({
                date: date,
                value: itemData.sellingStatus[0].currentPrice[0].__value__
            });
            data.updatedTime = date;
            firebase.database().ref(`listings/${keywords}/${itemId}`).set(data);
            // firebase.database().ref(`listings/${itemId}`).set(data);
        }else {
            let data = {
                itemId: itemData.itemId[0],
                title: itemData.title[0],
                condition: itemData.condition[0].conditionDisplayName,
                buyingOptions: itemData.listingInfo[0].listingType.join(','),
                currentBidPrice: itemData.sellingStatus[0].currentPrice[0].__value__,
                itemWebUrl: itemData.viewItemURL[0],
                updatedTime: date,
                data: itemData,
                bidHistory: [
                    {
                        date: date,
                        value: itemData.sellingStatus[0].currentPrice[0].__value__
                    }
                ]
            };
            firebase.database().ref(`listings/${keywords}/${itemId}`).set(data);
            // firebase.database().ref(`listings/${itemId}`).set(data);
        }
        console.log(`successfuly writed id:${itemData.itemId[0]} ${itemData.title[0]}`);
    });
}

console.log('start!!');

const processItem = (item, keywords) => {
    // console.log(JSON.stringify(item)); return false;
    // console.log(keywords);
    const itemId = item.itemId[0];
    const title = item.title[0];
    const condition = item.condition[0].conditionDisplayName;
    //const price = item.price;
    const buyingOptions = item.listingInfo[0].listingType.join(',');
    const currentBidPrice = item.sellingStatus[0].currentPrice[0].__value__;
    const itemWebUrl = item.viewItemURL[0];

    // console.log('itemId: '+itemId);
    // console.log(title);
    // console.log('condition: '+condition);
    // //console.log('price: '+price);
    // //console.log(price);
    // console.log('bid: '+currentBidPrice);
    // console.log(buyingOptions);
    // console.log('url: '+itemWebUrl);
    // console.log('');

    writeUserData(itemId, item, keywords);
}

const getList = async (keywords, categoryId, filters='', sort='') => {
    // const endpoint = `${url_list}filter=buyingOptions:{AUCTION}&filter=priceCurrency:USD&filter=price:[0..${maxPrice}]&category_ids=${categoryId}&q=${keywords}&limit=${limit}`;
    //const endpoint = `${url_list}filter=buyingOptions:{AUCTION}&category_ids=${categoryId}&q=${keywords}&limit=${limit}`;
    const endpoint = 'http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SERVICE-VERSION=1.0.0&SECURITY-APPNAME='+conf.appId+'&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&keywords='+keywords+'&categoryId='+categoryId+filters+sort+'&paginationInput.entriesPerPage=100';

    response = await fetch(endpoint);
    try {
        // console.log('SUCCESS!');
        if(response.ok) {
            const jsonResponse = await response.json();
            // const items_list = jsonResponse.findItemsAdvancedResponse[0];
            const items_list = jsonResponse.findItemsAdvancedResponse[0].searchResult[0].item;
            // console.log(items_list);
            if(items_list.length>0)
                items_list.forEach(item => processItem(item, keywords));
        }
    } catch(error) {
        // console.log('ERROR!');
        console.log(error);
    }

}





const keywords = 'T460S'; // what we need
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

    // 'itemFilter(2).name=MinBids',
    // 'itemFilter(2).value(0)=2',

    // 'itemFilter(3).name=MaxPrice',
    // 'itemFilter(3).value(0)=2000',
    // 'itemFilter(3).paramName=Currency',
    // 'itemFilter(3).paramValue=USD',
];
filters = '&'+filters.join('&');
// const filters = '&itemFilter(0).name=Condition&itemFilter(0).value=3000&itemFilter(1).name=FreeShippingOnly&itemFilter(1).value=true&itemFilter(2).name=SoldItemsOnly&itemFilter(2).value=true';
const sort = '';
// const sort = '&sortOrder=PricePlusShippingLowest';


getList(keywords, categoryId, filters, sort);
setInterval(() => {
    getList(keywords, categoryId, filters, sort);
}, 60*60*1000);



