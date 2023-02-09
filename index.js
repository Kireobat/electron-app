const { app, BrowserWindow } = require('electron');
const path = require('path');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');

app.on('ready', () => {
    const mainWindow = new BrowserWindow();
    mainWindow.loadFile(path.join(__dirname, './public/index.html'));
    mainWindow.webContents.openDevTools();
});

const main = async () => {
    await pie.initialize(app);
    const browser = await pie.connect(app, puppeteer);

    const window = new BrowserWindow();
    const url = 'https://www.google.com';
    await window.loadURL(url);

    const page = await pie.getPage(browser, window);
    console.log(page.url());
    window.destroy();
};

global.HelloWorld = function(name) {
    return "hello " + name;
}