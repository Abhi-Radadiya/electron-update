const { app, BrowserWindow, screen } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");

let mainWindow;

async function createWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    let screenDimention = primaryDisplay.workAreaSize;

    mainWindow = new BrowserWindow({
        width: screenDimention.width,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    mainWindow.loadURL("http://localhost:3000/");

    mainWindow.webContents.openDevTools();

    mainWindow.on("closed", function () {
        mainWindow = null;
    });

    // Trigger update check once the window is ready
    mainWindow.once("ready-to-show", () => {
        autoUpdater.checkForUpdatesAndNotify(); // Check for updates
    });
}

app.on("ready", createWindow);

app.on("activate", function () {
    if (mainWindow === null) {
        createWindow();
    }
});

// Auto-updater events
autoUpdater.on("update-available", () => {
    console.log("Update available!");
    mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-downloaded", () => {
    console.log("Update downloaded; will install now");
    mainWindow.webContents.send("update_downloaded");
    autoUpdater.quitAndInstall();
});
