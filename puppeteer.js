const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.type('input[class="gLFyf gsfi"]', 'I\'m Batman', {delay: 200}); 
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await page.screenshot({path: 'example.png'});
//   await browser.close();
    debugger;
})();