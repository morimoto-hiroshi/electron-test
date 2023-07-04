const {app, BrowserWindow} = require('electron');

/**
 * ウィンドウ作成
 */
const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
    })
    mainWindow.loadFile('public/index.html', {query: {isElectron: true}});

    //デベロッパーツール(f12)表示
    mainWindow.webContents.openDevTools()
}

//Electron の初期化が完了した。
app.whenReady().then(() => {
    createWindow()

    //MacではDockアイコンクリック時にウィンドウが無ければ開く。
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
});

//全ウィンドウが閉じたら終了。ただしMacは除く。
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
