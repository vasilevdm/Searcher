var fetch = require("node-fetch");
//import fetch from "node-fetch";
var firebase = require("firebase");
//import firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAC_NQBLIR-0jmSsh31XYciQ1iXfYK3_G4",
    authDomain: "searcher-3.firebaseapp.com",
    databaseURL: "https://searcher-3.firebaseio.com",
    projectId: "searcher-3",
    storageBucket: "searcher-3.appspot.com",
    messagingSenderId: "962335130160"
};
firebase.initializeApp(config);

const writeUserData = (itemId, itemData) => {
    const date = firebase.database.ServerValue.TIMESTAMP;
    let item = firebase.database().ref(`listings/${itemId}`);
    item.once('value', listing => {
        if(listing.exists()) {
            let data = listing.val();
            data.bidHistory.push({
                date: date,
                value: itemData.currentBidPrice.value
            });
            data.updatedTime = date;
            //data = data.bidHistory.push({datetime: itemData.currentBidPrice.value});
            //console.log(data);
            firebase.database().ref(`listings/${itemId}`).set(data);
        }else {
            let data = {
                itemId: itemData.itemId,
                title: itemData.title,
                condition: itemData.condition,
                //price : itemData.price,
                buyingOptions: itemData.buyingOptions.join(','),
                currentBidPrice: itemData.currentBidPrice.value,
                itemWebUrl: itemData.itemWebUrl,
                updatedTime: date,
                bidHistory: [
                    {
                        date: date,
                        value: itemData.currentBidPrice.value
                    }
                ]
            };
            firebase.database().ref(`listings/${itemId}`).set(data);
        }
    });

}

console.log('hello!!');
//alert('hello!');

const apiKey = 'v^1.1#i^1#I^3#p^1#r^0#f^0#t^H4sIAAAAAAAAAOVXa2wUVRTu9iW1gEBQeUnWAWOkzsydnd3tzoRdXdoCm/SxdGtFwNQ7M3faobszy9y7lhWpmwqNhIQo0YivUASiJAg0Bo0hYMD3D6MSE4kGbUQRURP5gYjR6J3dpWwr4VmExP2zmXPPPff7vvOYuSBTXjGrd37vqTGuG4r7MiBT7HIJlaCivKxqbEnxlLIiUODg6svMzJT2lBybjWEinpSbEU5aJkbu5Ym4ieWsMcikbFO2IDawbMIEwjJR5Vi4oV72cEBO2haxVCvOuCO1QUbyV3s1n4B0HxShpqjUap6J2WIFGb/kq/b4vSIQpAAA1YCuY5xCERMTaJIg4wFCgAUSK4AWQZC9QBYDnCD6FjHuVmRjwzKpCweYUBaunN1rF2A9P1SIMbIJDcKEIuG5saZwpLausWU2XxArlNchRiBJ4aFPNZaG3K0wnkLnPwZnveVYSlURxgwfyp0wNKgcPgPmMuDnpPapOlA0DQmC7hdFaUSknGvZCUjOj8OxGBqrZ11lZBKDpC+kKFVDWYpUkn9qpCEitW7nb0EKxg3dQHaQqZsTfiAcjTKh2oRB7HQrZGMI2moHstlocy0LAh6gqEo1PVpSNRXqYv6gXLS8zMNOqrFMzXBEw+5Gi8xBFDUaro1YoA11ajKb7LBOHESFfuIZDT3SIiepuSymSIfp5BUlqBDu7OOFMzC4mxDbUFIEDUYYvpCVKMjAZNLQmOGL2VrMl89yHGQ6CEnKPN/V1cV1iZxlt/MeAAR+YUN9jIqYgAz1dXo9529ceANrZKmoiO7EhkzSSYplOa1VCsBsZ0Ii8Hh8Ql73obBCw63/MhRw5od2xEh1iEeHUsCr+b2CR1AkjzgSHRLKFynv4EAKTLMJaHcikoxDFbEqrbNUAtmGJos+3SMGdMRqfklnvZKus4pP87OCjhBASFFUKfB/apSLLfWYaiVR1IobanpECn7kit3WotAm6RiKx6nhYqv+nCSxQ/Kq03N6/ZIoOjEwDQKTBufUNqdaCd6CdKg5prYs6ivibdD34XWVVEowx9TQci8yLkuXww+rnI2wlbLpO5xrcuZ6i9WJTNolxLbicWS3XvTcu8oT/RpN83OyUuMGlbHtemN2iWPyMmsbkmvIurTHtfgczAWf6PdVS34xcEXcarJ5bUn/B0PrkhI738IEaVfhA4Qfeh0KFWV/Qo9rN+hx9dMbFeDBHcIMcHt5yX2lJaOnYIMgzoA6h412k37l24jrROkkNOzictfiabu2tRVcwPoeBJMGr2AVJUJlwX0MTDu7UibcdOsYIQAkAQiCF4iBRWDG2dVS4ZbSiY+tjyxj773zxvCkvo2TR+9YdfPJdRYYM+jkcpUV0cooeuvdP/j32vRY0fbjvd0HDy7bum3L6W9HQeGTyKzTHy2z1iz5+9fGjw9NBd+d/jBz28snPq2s2p/Zu+C3NavvbqiYE9mz3936y6s8nzoM1bYlhw5P3vTTF0vrguv37Zud3lB5pPaD9vHPfDP2885VOwcOrZ3+0LgJT+8ekN48yoxXH/ehUx0zn5j3fHjqzrH29ifnbVBWfB3+auIrr1W77+nr6d1ywDN1R2vzpr/MR1fA/v4dL1Y1SOnvH/lx4f1HpssnV45azb/R/U5zdPri9xuXrNp1Ym9Vu/XlXS9tnrD1uMRurJ/22e7fn9pTl0AD4pYfDrywTxl49tix7sr++Lj6t/98feXacT+fajwaVTc/tzGXvn8A+DUBHRoPAAA=';

//const url = 'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=108765&q=Beatles&filter=price:[200..500]&filter=priceCurrency:USD&limit=10';
//const url_list = 'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=175672&q=T470s&limit=10';
const url_list = 'https://api.ebay.com/buy/browse/v1/item_summary/search?';
const headers = {
    Authorization: 'Bearer ' + apiKey
}
const data = {
    method: 'GET',
    headers: headers
}

const processItem = item => {
    const itemId = item.itemId;
    const title = item.title;
    const condition = item.condition;
    //const price = item.price;
    const buyingOptions = item.buyingOptions.join(',');
    const currentBidPrice = item.currentBidPrice.value;
    const itemWebUrl = item.itemWebUrl;
    console.log('itemId: '+itemId);
    console.log(title);
    console.log('condition: '+condition);
    //console.log('price: '+price);
    //console.log(price);
    console.log('bid: '+currentBidPrice);
    console.log(buyingOptions);
    console.log('url: '+itemWebUrl);
    console.log('');
    writeUserData(itemId, item);
}

const getList = async (keyword, category, maxPrice=1000, limit=10) => {
    const endpoint = `${url_list}filter=buyingOptions:{AUCTION}&filter=priceCurrency:USD&filter=price:[0..${maxPrice}]&category_ids=${category}&q=${keyword}&limit=${limit}`;
    //const endpoint = `${url_list}filter=buyingOptions:{AUCTION}&category_ids=${category}&q=${keyword}&limit=${limit}`;
    const response = await fetch(endpoint, data);
    try {
        //console.log(response);
        if(response.ok) {
            const jsonResponse = await response.json();
            //console.log(jsonResponse);
            jsonResponse.itemSummaries.forEach(item => processItem(item));
        }
    } catch(error) {
        console.log(error);
    }
}

getList('T460S', '175672', 300, 10);

