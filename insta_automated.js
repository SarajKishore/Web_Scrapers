const puppeteer = require('puppeteer');

(async () => {
    const BASE_URL='https://twitter.com';
    const USERNAME='sarajkishore@gmail.com';
    const PASSWORD='nikkug123gax53knot'; 
    const LOGIN_URL='https://twitter.com/login';

  const browser = await puppeteer.launch({
      headless: false,
  });
  const page = await browser.newPage();
  await page.goto(LOGIN_URL); 
//   await page.waitFor('a[href="/accounts/login/?source=auth_switcher"]');
//   await page.click('a[href="/accounts/login/?source=auth_switcher"]');
  await page.waitFor(500);
  await page.waitFor('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]',{delay: 25} );
  await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[username_or_email]"]',USERNAME,{delay: 25});
  await page.type('form[class="t1-form clearfix signin js-signin"] input[name="session[password]"]',PASSWORD);
 
  await page.click('#page-container > div > div.signin-wrapper > form > div.clearfix > button');
  debugger;
//   await browser.close();

})();