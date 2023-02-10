const { app, BrowserWindow, contextBridge, shell} = require('electron');
const path = require('path');
const puppeteer = require('puppeteer');
const { ipcMain } = require('electron');
const fs = require('fs');

fs.writeFileSync('output.txt', '');
console.log("output.txt created")

createWindow = async () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js') // use a preload script
        }
    });

    // Load app
    mainWindow.loadFile(path.join(__dirname, './public/index.html'));
    mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

ipcMain.handle("myfunc", async (event, arg) => {
    return new Promise((resolve, reject) => {
        // do something
        if (true) {
            resolve("success");
        } else {
            reject("error");
        }
    });
});

//---------------------------------------------------------------------

// Show output.txt in folder

ipcMain.handle("show-codes", async (event, arg) => {
    return new Promise((resolve, reject) => {
        // do something
        shell.showItemInFolder(path.join(__dirname, 'output.txt'));
        if (true) {
            resolve("success");
        } else {
            reject("error");
        }
    });
});

const appendFile = (data) => {
    fs.appendFileSync('output.txt', data);
    console.log('Saved!');
}
let i = 0;
let randomMail = "randomMail" + Math.floor(Math.random()) +"Iter"+i+ "@random.com";

console.log("randomMail: " + randomMail)

let data = "";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const puppeteerFunction = async() => {

    console.log("puppeteer started")

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.jackery.com');


    randomMail = "randomMail" + Math.floor(Math.random() * 10000000) +"Iter"+i+ "@random.com";

    console.log("randomMail: " + randomMail)
    await page.type('input[id="subscribeEmail"]', randomMail)

    await page.click('img[class="J-gift"]')

    await delay(5000);

    const codeText = await page.$('[class="J-code-text"]');
    const descText = await page.$('[class="percentage-wrap"]');
    const validForText = await page.$('[class="time-wrap J-date-text"]');

    let code = await (await codeText.getProperty('textContent')).jsonValue();
    let desc = await (await descText.getProperty('textContent')).jsonValue();
    let validFor = await (await validForText.getProperty('textContent')).jsonValue();

    data = { code, desc, validFor};

    await browser.close();
    return data;
};



ipcMain.handle("run-puppeteer", async (event, arg) => {


    await puppeteerFunction();

    let content = "----------------"+"\n"+"Code: " + data.code + "\n" + "Description: " + data.desc + "\n" + "Valid For: " + data.validFor + "\n";

    appendFile(content);
    return new Promise((resolve, reject) => {
        // do something
        
        if (true) {
            resolve("success");
        } else {
            reject("error");
        }
    });
});