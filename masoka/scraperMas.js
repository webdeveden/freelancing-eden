const { chromium } = require("playwright");

const fs = require("fs");

async function download() {
  // Launch real browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Go to the website and WAIT for it to fully load
  await page.goto("https://home-haven--edenbenjamin608.replit.app/", {
    waitUntil: "networkidle", // waits until no more network requests
  });

  // Grab the FULL rendered HTML (after JavaScript ran)
  const html = await page.content();
  fs.writeFileSync("index.html", html);
  console.log("✅ HTML saved!");

  // Download all CSS
  const cssLinks = await page.evaluate(() => {
    return [...document.styleSheets].map((s) => s.href).filter(Boolean);
  });

  console.log("Found CSS files:", cssLinks);

  await browser.close();
}

download();
