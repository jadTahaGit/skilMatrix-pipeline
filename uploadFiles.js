const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function uploadFile(filePath) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://dev-skill-matrix-import.herokuapp.com/', {
    waitUntil: 'networkidle2',
  });

  await page.screenshot({ path: 'example.png' });

  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click('.file-upload-input'),
  ]);

  await fileChooser.accept([filePath]);

  await page.click('#btnSend');

  await page.waitForSelector('#responseText');

  const responseElement = await page.$('.response-text-field');
  let responseText = '';
  do {
    responseText = await page.evaluate(
      (element) => element.innerText,
      responseElement
    );
    await page.waitForTimeout(1000); // wait for 1 second before checking the text again
  } while (!responseText);

  if (responseText.includes('Successfully imported')) {
    console.log(`Upload successful for ${path.basename(filePath)}`);
  } else {
    console.log(`Upload failed for ${path.basename(filePath)}`);
  }

  setTimeout(function () {
    browser.close();
  }, 2000); // 2000 milliseconds = 2 seconds
}

async function uploadFiles(directory) {
  const files = fs.readdirSync(directory);

  files
    .filter((file) => {
      console.log('File name: ', file); // Log the name of the file
      return path.extname(file) === '.xlsx';
    })
    .map((file) => uploadFile(path.join(directory, file)));

  //   uploadFile('./skill-matrizes/11018.xlsx');

  console.log('Back to main FKT');
}

module.exports = uploadFiles;
