const { app, BrowserWindow, contextBridge} = require('electron');
const path = require('path');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');
const { ipcMain } = require('electron');

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

const puppeteerFunction = async () => {
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