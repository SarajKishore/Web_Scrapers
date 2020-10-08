const puppeteer = require('puppeteer');
const BASE_URL='https://twitter.com';
const LOGIN_URL='https://twitter.com/login';
// const USERNAME='sarajkishore@gmail.com';
// const PASSWORD='';
let browser= null;
let page=null;
const twitter = {
    intialize: async()=>{
        browser = await puppeteer.launch({
            headless: false,
        });
         page = await browser.newPage();
         await page.goto(BASE_URL);
    },
    login: async(username,password)=>{
        await page.goto(LOGIN_URL);
        await page.waitFor(500);
        await page.waitFor('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]',{delay: 25} );
        await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]',username,{delay: 25});
        await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[password]"]',password);
        
        await page.click('#page-container > div > div.signin-wrapper > form > div.clearfix > button');
    },
    end: async()=>{
        await browser.close();
    },
};

module.exports= twitter;        //use as normal module and can be imported to another js