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
		let telegram_buffer = [];
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

			let left_days = item.left.replace(/P([^D]*)DT.+/g, "$1");
			let left_hours = item.left.replace(/P[^D]*DT([^H]*)H.+/g, "$1");
			let date_current = new Date();
			date_current.setHours(date_current.getHours() - 12);
			let date_end = new Date(item.end);
			let updated_date = new Date(el.updatedTime);
			updated_date.setHours(updated_date.getHours() + 1);
			if (item.price<300 && left_days>0 && left_hours>0 && date_current < date_end && updated_date >= date_current) {
			// if (item.price<350) {
				let msg = [];
				// msg = [item.title];
				msg.push(item.price+'$');
				// msg.push(item.photo);
				// msg.push(item.condition);
				// msg.push('End: '+item.end);
				msg.push('Left: '+left_days+'d '+left_hours+'h');
				// msg.push('Status: '+item.status);
				// msg.push('Bids: '+item.bids);
				msg.push(item.link);
				msg.push('');
				msg = msg.join('\n\r');
				// console.log(msg);
				//bot.sendMessage(conf.telegram_chat_id, msg, {"disable_web_page_preview":true});
				telegram_buffer.push(msg);
			}

		}
		if (telegram_buffer.length>0)
			bot.sendMessage(conf.telegram_chat_id, telegram_buffer.join('\n\r'), {"disable_web_page_preview":true});
	});
}
console.log('Start writing');
//write to database from ebay
App.getList('T460S', App.categoryId, App.filters, App.sort, conf.appId, firebase);
App.getList('T470', App.categoryId, App.filters, App.sort, conf.appId, firebase);
// App.getList('T470S', App.categoryId, App.filters, App.sort, conf.appId, firebase);
App.getList('thinkpad+x1+6200U', App.categoryId, App.filters, App.sort, conf.appId, firebase);
App.getList('thinkpad+x1+6300U', App.categoryId, App.filters, App.sort, conf.appId, firebase);
App.getList('thinkpad+x1+6500U', App.categoryId, App.filters, App.sort, conf.appId, firebase);
App.getList('thinkpad+x1+6600U', App.categoryId, App.filters, App.sort, conf.appId, firebase);
// App.getList('T460', App.categoryId, App.filters, App.sort, conf.appId, firebase);
// App.getList('T470', App.categoryId, App.filters, App.sort, conf.appId, firebase);
// setInterval(() => {
//     App.getList('T460S', App.categoryId, App.filters, App.sort, conf.appId, firebase);
//     App.getList('T470S', App.categoryId, App.filters, App.sort, conf.appId, firebase);
// }, 0.25 * 60 * 60 * 1000 ); // every 0.25 hour
console.log('End writing');

console.log('Start reading');
//get from database
let date = new Date();
date_h = date.getHours();
date_m = date.getMinutes();
console.log(date_h);
console.log(date_m);

	// getAll('T460S');
	// getAll('T470S');

if(
	// (date_h==6 && date_m>=0 && date_m<5)
	// ||
	(date_h==9 && date_m>=0 && date_m<5)
	// ||
	// (date_h==12 && date_m>=0 && date_m<5)
	// ||
	// (date_h==15 && date_m>=0 && date_m<5)
	// ||
	// (date_h==18 && date_m>=0 && date_m<5)
	) {
	getAll('T460S');
	getAll('T470');
	// getAll('T470S');
	getAll('thinkpad+x1+6200U');
	getAll('thinkpad+x1+6300U');
	getAll('thinkpad+x1+6500U');
	getAll('thinkpad+x1+6600U');
	// getAll('T460');
	// getAll('T470');
}

// setInterval( () => {
// 	getAll('T460S');
// 	getAll('T470S');
// }, 1 * 60 * 60 * 1000 ); // every hour
console.log('End reading');
