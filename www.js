//import config
// const conf = require('./conf.js');
// const conf_firebase = conf.firebase;
let conf = process.env;
const conf_firebase = {
	apiKey: process.env.firebase_apiKey,
	authDomain: process.env.firebase_authDomain,
	databaseURL: process.env.firebase_databaseURL,
	projectId: process.env.firebase_projectId,
	storageBucket: process.env.firebase_storageBucket,
	messagingSenderId: process.env.firebase_messagingSenderId
};
// import from app.js
const App = require("./app.js");
//import fetch from "node-fetch";
const fetch = require("node-fetch");
//import firebase from "firebase";
const firebase = require("firebase");
// Initialize Firebase
firebase.initializeApp(conf_firebase);
// Telegram bot
const TelegramBot = require('node-telegram-bot-api');
const telegramToken = conf.telegram;
const bot = new TelegramBot(telegramToken);
// bot.sendMessage(conf.telegram_chat_id, 'hElLo!1');

const getAll = keywords => {
	const itemsRef = firebase.database().ref('/listings/'+keywords);
	// const items = firebase.database().ref('/listings');
	itemsRef.once('value', items => {
		itemsData = items.val();
		for (let index in itemsData) {

			const el = itemsData[index];

			let item = {};
			item.title = el.data.title[0];
			item.price = el.data.sellingStatus[0].convertedCurrentPrice[0].__value__;
			item.link = el.data.viewItemURL[0];
			item.photo = el.data.galleryURL[0];
			// item.deadline = el.;
			item.condition = el.data.condition[0].conditionDisplayName[0];
			item.end = el.data.listingInfo[0].endTime[0];
			item.left = el.data.sellingStatus[0].timeLeft[0];
			item.status = el.data.sellingStatus[0].sellingState[0];
			item.bids = el.data.sellingStatus[0].bidCount[0];

			// el.bidHistory.forEach( bid => {
			// 	let date_h = new Date();
			// 	date_h.setTime(bid.date);
			// 	console.log(`date: ${date_h.getDate()}.${date_h.getMonth()} price: ${bid.value}`);
			// } );

			if (item.price<350) {
				let msg = [item.title];
				msg.push(item.price+'$');
				msg.push(item.link);
				// msg.push(item.photo);
				msg.push(item.condition);
				msg.push('End: '+item.end);
				msg.push('Left: '+item.left);
				// msg.push('Status: '+item.status);
				msg.push('Bids: '+item.bids);
				msg.push('');
				msg = msg.join('\n\r');
				// console.log(msg);
				bot.sendMessage(conf.telegram_chat_id, msg);
			}

		}
	});
}

//write to database from ebay
App.getList('T460S', App.categoryId, App.filters, App.sort, conf.appId, firebase);
App.getList('T470S', App.categoryId, App.filters, App.sort, conf.appId, firebase);
setInterval(() => {
    App.getList('T460S', App.categoryId, App.filters, App.sort, conf.appId, firebase);
    App.getList('T470S', App.categoryId, App.filters, App.sort, conf.appId, firebase);
}, 0.5 * 60 * 60 * 1000 ); // every 0.5 hour

//get from database
getAll('T460S');
getAll('T470S');
setInterval( () => {
	getAll('T460S');
	getAll('T470S');
}, 1 * 60 * 60 * 1000 ); // every hour

