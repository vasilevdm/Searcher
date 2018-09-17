const conf = require('./conf.js')
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

const apiKey = 'v^1.1#i^1#I^3#p^1#f^0#r^0#t^H4sIAAAAAAAAAOVXf2wTVRxvux9s4FBBmSxTuhsqiHd912vX60kbyjpCw8bqWhaZEPJ6926ca++ae69sTRTLNKhBTFCUGIkZUVAWFcUgURQCRvAfEkPwD2OiiREkIZGgf8xkkPjuVkY3CD+HkNh/mvu+7/u+z+fz/XH3QKGy+rH1i9cP1TgnuQYKoOByOvkpoLqyYt7UMlddhQOUODgHCrML5f1lp+ZjmElnpQ6Es4aOkbsvk9axZBtDTM7UJQNiDUs6zCAsEVlKRNpaJS8HpKxpEEM20ow7Fg0xfFBWlFRKVVVZFlUEqFW/EDNphBg/7w8EBSA2Qd4XEBS6jHEOxXRMoE5CjBfwIguCLA+SvCD5BMkrck0+votxdyITa4ZOXTjAhG20kr3XLIF6ZaQQY2QSGoQJxyKLEu2RWLRlaXK+pyRWuChDgkCSw2Ofmg0FuTthOoeufAy2vaVETpYRxownPHLC2KBS5AKYG4BvK+2V/YrIi9AbgCgoeIMTIuUiw8xAcmUclkVTWNV2lZBONJK/mqJUjdQzSCbFp6U0RCzqtv6ezMG0pmrIDDEtCyPLI/E4E45mNGLmOyGbQNCUVyOTjXdEWSB6QUpOBejRtMhkqArFg0aiFWUed1KzoSuaJRp2LzXIQkRRo/HaCCXaUKd2vd2MqMRCVOrnv6Ch4O+ykjqSxRxZrVt5RRkqhNt+vHoGRncTYmqpHEGjEcYv2BKFGJjNagozftGuxWL59OEQs5qQrOTx9Pb2cr0CZ5jdHi8AvOepttYEFTEDGcvX6nXbX7v6BlazqciI7sSaRPJZiqWP1ioFoHczYQF4vX6+qPtYWOHx1ksMJZw9YztiojpEhE0BXxACCGgnBhVxIjokXCxSj4UDpWCezUCzB5FsGsqIlWmd5TLI1BRJ8KtegU5AVmkKqqwvqKpsyq80sbyKEEAolZKD4v+pUa611BOykUVxI63J+Ykp+AkrdlOJQ5PkEyidpoZrrfrLksQWyVtPz+r166FoxcA0CMxqnFXbnGxkPAakQ80yrbJR3xRvjb4P76ikUoIjTDVl5EXG2XQ5vEbmTISNnEnf4Vy7NdeTRg/SaZcQ00inkdl5zXPvVk/02zPNL8tKTmtUxlV3GrPrHJM3WNuQ3E7W5f3OrkuZ836hyS8GABBviluznddk/r8YWteT2MUGJki5BR8gnrG3obDD/vH9zj2g3/kZvVABD3iYbwQNlWXLysvuqsMaQZwGVQ5r3Tr9yjcR14PyWaiZrkrn0/Wf7lxVcv8aWAkeGL2BVZfxU0quY6D+4koFf3dtDS+CIA94wSd4xS7QeHG1nJ9Rft/RBUvO7J311ukZ++45Nod5o+rdM1+fADWjTk5nhYMWhuOVI2G4dvLcluojP5/9fKi2rb224ol1Ox8RHnIJ4X27FzzPBL4ZrB/8nlnrOjT4+Mn+480bX/BsHZq2aej1+HeFf9Izd284t3XF9PNt5Qcn9bzT8barbibuXrdmsOewv+H0vpd837ZWdvsPnN8Z7t+8papV5Q9suT969osP25KnMmdefLmhcdo5x569n+xS1sWGzdyho8NS2/HjDR/c+2vszRXzls99dvu2RdFOZXNdctlXr/21dS12Hv7y/Zof9/etfC8/p/enj36YtcOoqzrx+2HHHy3T9wfiZd3PdTT4q5ZMPXjMNXzkz9/qTxY2OtRJkH10U/2r2zfunr1t8q7wg3/jHbtqB36ZFTv38ansSPr+BZ/DKw8ZDwAA';
// const apiKey = 'v^1.1#i^1#f^0#r^0#p^1#I^3#t^H4sIAAAAAAAAAOVXfWwTZRhft25zjgkKcWRBqIdAZN71vbu21ztotWyMDdkHtCwwonC9e4+da+/qvW/ZiiYs05BoiDEEzUSFaZxRwS8SCC6SQAyBREhE4xTRoDERIupffqEovncto5uE8TGExP7T3PM+7/P+fr/n4+4F3SVls9fXr/+twlVa2NcNugtdLrYclJUUV99SVFhVXADyHFx93Xd1u3uKTs5FcjKRkpZAlDINBD1dyYSBJMcYotKWIZky0pFkyEmIJKxI0UjjIoljgJSyTGwqZoLyNNSGKN7HCoIAWRjw+QUlyBKrcS5mzAxRLK9AVoyrAT+vcnExTtYRSsMGA2HZwCGKA2yQBiLNCjHWJwFR4njGJ7BtlKcVWkg3DeLCACrswJWcvVYe1otDlRGCFiZBqHBDpC7aHGmond8Um+vNixXO6RDFMk6j4U81pgo9rXIiDS9+DHK8pWhaUSBClDecPWF4UClyDswVwHekDgRZRVVVRRDjPOcT/WMiZZ1pJWV8cRy2RVdpzXGVoIF1nBlNUaJG/CGo4NxTEwnRUOux/xan5YSu6dAKUfPnRZZHWlqocG1Sx1amVaajULaUdmjRLUtqaRDkQFyJC+RoUVEVWeNzB2Wj5WQecVKNaai6LRryNJl4HiSo4XBteMmfpw1xajaarYiGbUT5foFzGga4Njup2Symcbth5xUmiRAe53H0DAztxtjS42kMhyKMXHAkClFyKqWr1MhFpxZz5dOFQlQ7xinJ6+3s7GQ6eca0Vns5AFjvssZFUSJiUqaIr93rWX999A207lBRINmJdAlnUgRLF6lVAsBYTYV5wHF+Nqf7cFjhkdZ/GfI4e4d3xFh1CKtxWsDn02RR8ItBQRyLDgnnitRr44BxOUMnZasD4lRCViCtkDpLJ6GlqxLv1zg+qEFaDYga7RM1jY771QDNahACCONxRQz+nxrlUks9qpgp2GImdCUzJgU/dsVuqS2yhTNRmEgQw6VW/QVJIpvkNadn9/plUbRjIBJETumMXduMYia9pkyGmm1a6aC+Kt46eR/eUEklBLNMdTX7ImMcugxaozAWRGbaIu9wptme6zGzAxqkS7BlJhLQar3kuXeNJ/p1muYXZKUkdCLjyhuN2WWOySusbRlfR9buHteKCzBn/bzAijwfuDpuNU5eY5n/YGhdVmLrTYSheg0+QLzDr0PhAufH9rh2gh7Xu+RGBbxgBjsd3FlStNRdNK4K6RgyuqwxSF9tkK98CzIdMJOSdauwxLViyjuvr8y7gPU9ACYPXcHKitjyvPsYmHJ+pZgdX1nBBoHICqwPiBzfBqafX3Wzt7snTZ21Vq09Pd7t37r/1PvTXOvuPfX7ZlAx5ORyFReQyijYRvXeb352clfobHWsbMXnT48/3D1x7wAsWDunaTlf3jT7A71xV+nsVdUHX+pd+N1NZ3cvrd8//cfyCZ39394za/K25PMnFhcux3u7fBVHjh3c/KXauuDAww9u3LGs9Hhg6dreidUf+t/a8sTPx159+T5vW2PRvtcO1j3Xd2DCHuG2t/E3X3/x2MxHBmMD9Z8eOrPrl66jA503z5gyGHn2vRdO+Pbc7ZMer5q2Yc2hwZpH/6r8aesbH7+5ZbuwfUHNtD86BqfWGKC69Y41X805rVd5Pir9pH/HU69Urvp1060LZ/aU9m/9fk59aNOkI+3uM9yqJ9dVdu0eJx0//OczzRPwQJ25ft7RFz37f9j49ynPvt6d2fT9A+QtXMMaDwAA';

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

    response = await fetch(endpoint, data);
    if(response.status===401) {
        console.log('refresh token!');

        const base64 = new Buffer(conf.clientID + ':' + conf.clientSecret).toString('base64');
        response_oauth = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + base64
            },
            // data: {
            //     grant_type: 'refresh_token',
            //     refresh_token: 'refresh_token'
            // }
        });
        console.log(response_oauth);

        return false;
    }else{
        console.log('token is ok!');

        const response = await fetch(endpoint, data);
        try {
            console.log(response);
            if(response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                jsonResponse.itemSummaries.forEach(item => processItem(item));
            }
        } catch(error) {
            console.log(error);
        }
    }

}

// const checkEbayToken = async (endpoint, data) => {
//     response = await fetch(endpoint, data);
//     if(response.status===401) {
//         console.log('refresh token!');
//         return false;
//     }else{
//         console.log('token is ok!');
//         return true;
//     }
// }

getList('T460S', '175672', 300, 50);

