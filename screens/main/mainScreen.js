const { BrowserWindow, ipcMain } = require("electron");
const path = require("path");

class MainScreen {
    window;

    position = {
        width: 1000,
        height: 600,
        maximized: false,
    };

    constructor() {
        this.window = new BrowserWindow({
            width: 400,
            height: 400,
            title: "Peptide synthesis",
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                contextIsolation: true,
                enableRemoteModule: false,
            },
        });

        this.window.loadURL("http://localhost:3000");

        this.window.once("ready-to-show", () => {
            this.window.show();

            if (this.position.maximized) {
                this.window.maximize();
            }
        });

        this.handleMessages();

        let wc = this.window.webContents;
        wc.openDevTools();
    }

    showMessage(message) {
        console.log("showMessage trapped");
        console.log(message);
        this.window.webContents.send("updateMessage", message);
    }

    close() {
        this.window.close();
        ipcMain.removeAllListeners();
    }

    hide() {
        this.window.hide();
    }

    handleMessages() {
        //Ipc functions go here.
    }
}

module.exports = MainScreen;
