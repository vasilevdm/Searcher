var fetch = require("node-fetch");
console.log('hello!!');
//alert('hello!');

//const url = 'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=108765&q=Beatles&filter=price:[200..500]&filter=priceCurrency:USD&limit=10';
//const url_list = 'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=175672&q=T470s&limit=10';
const url_list = 'https://api.ebay.com/buy/browse/v1/item_summary/search?';
const headers = {
    Authorization: 'Bearer v^1.1#i^1#f^0#p^1#r^0#I^3#t^H4sIAAAAAAAAAOVXa2wUVRTuttuaBouY4otgWAeVgM7snX3OTNiVhRZYpHRhawNFg3dn7tChuzPj3LuUJQZrTftDkKCoAYxaE23kFVEwphr1B2galRJDjKZGY6MhRiVqwfAIEu/MLmVbCc8iJO6P2cy55557vu887hzQVlE5rXNu57Eq1w2lXW2grdTl4seAyory+8aWlU4oLwFFCq6utrvb3O1lP0/HMJM2pUUIm4aOkWdVJq1jyRFGmKylSwbEGpZ0mEFYIrKUjNXNl3wckEzLIIZspBlPvCbC8AAE5ZAiiiF/GPJymEr1MzYbjAgj+gOCDJWwHA6FA4IvQNcxzqK4jgnUSYTxAV5ggcjyoAEEpWBI8okc7w81MZ5GZGHN0KkKB5io467k7LWKfD2/qxBjZBFqhInGY7OT9bF4Te2ChuneIlvRAg9JAkkWD3+bZSjI0wjTWXT+Y7CjLSWzsowwZrzR/AnDjUqxM85chvsO1SkQUhUgiMEAFAR/ODgqVM42rAwk5/fDlmgKqzqqEtKJRnIXYpSykVqBZFJ4W0BNxGs89t/CLExrqoasCFM7M7Yklkgw0ZqMRqxcI2STCFpyM7LYxKIaFgg+kJJTYXq0KCsyVP2Fg/LWCjSPOGmWoSuaTRr2LDDITES9RiO5CRRxQ5Xq9XorphLbo2K98BkOfWKTHdR8FLOkWbfjijKUCI/zeuEIDO0mxNJSWYKGLIxccCiKMNA0NYUZuejkYiF9VuEI00yIKXm9ra2tXKufM6zlXh8AvHdx3fwkJTEDGapr13peX7vwBlZzoMiI7sSaRHIm9WUVzVXqgL6cifqBzxfkC7wPdys6UvovQRFm7/CKGK0KgSKfkhFU+bDM8/Q5GhUSLSSp1/YDpWCOzUCrBREzDWXEyjTPshlkaYrkD6o+v6AiVgmJKhsQVZVNBZUQy6sIAYRSKVkU/k+FcrGpnpQNEyWMtCbnRiXhRy/ZLSUBLZJLonSaCi42688JEtsgrzo8u9YvCaJtA1Mj0NQ4O7c52ch4DUibmi1a5nh9Rbg1eh9eV0GlAPNINSV/kXEOXA6vlDkLYSNr0Tucq7f7eoPRgnRaJcQy0mlkNV5037vKHf0adfNzopLTGqVx2fWG7BLb5GXmNiTXELW73bX0HMj5oD8UDAqiIF4RtllOXBty/0HTuqTAzjUwQcpV+ADxDh+HoiXOj293vQvaXW/TiQp4wT38ZHBXRdlD7rIbJ2CNIE6DKoe15Tr9yrcQ14JyJtSs0grX0om7ti4rGsC6HgG3D41glWX8mKJ5DEw8u1LO33RbFS8A0Z6qgiF6nYLJZ1fd/K3u8TvmbJn097j3an/s/6nl/Tc+PfnM4b69oGpIyeUqL6GZUfJArG5t9S41Ux/4oXne+u0n3uFm9OYW7vnlZXPruI3Ci6eOPty9BgzsadReXdf38cw/71SfWLx9/7wvouHj4fDArx/uG1zYXP37wam9VU3bfA92j526YtKk7zr61tw8+Py9cyYfMbj+02N2PtZ7x86apiPuni9139xXNm3qffbAH5ljiK19+q3Kk2+um/hN694d/af3T3nOM/jo6jXdHxxuqD40bULX/tUH2QO9s/H8Y1OqBzp6jE2ru6Yb1srBrUu6+n7r+Cw+pap746DJP7729X52c8+ppw61mF8nOueNxy/df8tfLfvWf9v5Udnmju+/2vbaC+on49bXpXfHF+0emJHYsmdz/VH3k8d7Npz4PJkP3z8efKNrGg8AAA=='
}
const data = {
    method: 'GET',
    headers: headers
}

const processItem = item => {
    const title = item.title;
    const condition = item.condition;
    const price = item.price;
    const buyingOptions = item.buyingOptions[0];
    const currentBidPrice = item.currentBidPrice.value;
    const itemWebUrl = item.itemWebUrl;
    console.log(title);
    console.log('condition: '+condition);
    //console.log('price: '+price);
    //console.log(price);
    console.log('bid: '+currentBidPrice);
    console.log(buyingOptions);
    console.log('url: '+itemWebUrl);
    console.log('');
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

