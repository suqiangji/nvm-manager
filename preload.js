const { contextBridge, ipcRenderer } = require('electron');

// 使用 contextBridge 安全暴露 API
contextBridge.exposeInMainWorld('nvmAPI', {
  list: () => ipcRenderer.invoke('nvm-list'),
  install: (version) => ipcRenderer.invoke('nvm-install', version),
	uninstall: (version) => ipcRenderer.invoke('nvm-uninstall', version),
  use: (version) => ipcRenderer.invoke('nvm-use', version),
	available: (version) => ipcRenderer.invoke('nvm-list-available', version)
});
