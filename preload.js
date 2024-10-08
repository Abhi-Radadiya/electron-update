const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
    onUpdateAvailable: (callback) => ipcRenderer.on("update_available", callback),
    onUpdateDownloaded: (callback) => ipcRenderer.on("update_downloaded", callback),
});
