const puppeteer = require('puppeteer');
const twitter= require('./twitter');

(async () => {
    const BASE_URL='https://twitter.com';
    const USERNAME='sarajkishore@gmail.com';
    const PASSWORD='nikkug123gax53knot'; 
    const LOGIN_URL='https://twitter.com/login';

    await twitter.intialize();
    await twitter.login(USERNAME,PASSWORD);
    await twitter.end();
    debugger;
})();