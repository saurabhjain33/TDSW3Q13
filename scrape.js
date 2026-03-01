const { chromium } = require('playwright');

(async () => {
  // The list of URLs provided in the assignment
  const urls = [
    '78', '79', '80', '81', '82', '83', '84', '85', '86', '87'
  ].map(seed => `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  let totalSum = 0;

  for (const url of urls) {
    await page.goto(url);
    // Wait for the table to load (since it's dynamically generated)
    await page.waitForSelector('table');

    // Find all table cells (td), get their text, and add them up
    const numbers = await page.$$eval('td', cells => 
      cells.map(cell => parseFloat(cell.innerText)).filter(num => !isNaN(num))
    );
    
    const pageSum = numbers.reduce((a, b) => a + b, 0);
    totalSum += pageSum;
  }

  console.log("FINAL TOTAL SUM:", totalSum);
  await browser.close();
})();
