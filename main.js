const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 900,
    height: 680,
		title: '(NVM) NODE版本管理工具 v1.0.0',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // 用于渲染进程和主进程的通信
      nodeIntegration: true,
    }
  });
	
	
	
	win.setMenu(null);  
	
	addShortcut()
	if(process.env.NODE_ENV === 'development') {
		win.webContents.openDevTools(); 
	}
	
  win.loadFile('index.html');
  win.on('closed', () => {
    win = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 主进程处理与 nvm 相关的命令
ipcMain.handle('nvm-list', () => {
  return new Promise((resolve, reject) => {
     exec('nvm ls', (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
});

ipcMain.handle('nvm-install', (event, version) => {
  return new Promise((resolve, reject) => {
    exec(`nvm install ${version}`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
});

ipcMain.handle('nvm-use', (event, version) => {
  return new Promise((resolve, reject) => {
    exec(`nvm use ${version}`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
});

ipcMain.handle('nvm-list-available', (event, version) => {
  return new Promise((resolve, reject) => {
    exec(`nvm list available`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
});

ipcMain.handle('nvm-uninstall', (event, version) => {
  return new Promise((resolve, reject) => {
    exec(`nvm uninstall ${version}`, (err, stdout, stderr) => {
      if (err) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
});

function addShortcut() {
  globalShortcut.register("Ctrl+N", () => {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    } else {
      mainWindow.minimize();
    }
  });
}
