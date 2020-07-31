const { app, BrowserWindow } = require('electron')

// Include tools in development environments
if (process.env.NODE_ENV == "development") {
    console.log("Running in development mode.");
    require('electron-reload')(__dirname);
}

function createGameWindow() {
    // Create a browser window for the game to be displayed in
    const gameWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        webPreferences: {
            nodeIntegration: true
        }
    })
    // Load the main HTML file in the game window
    gameWindow.loadFile('index.html')
}
// When electron is ready, start the game's display window
app.whenReady().then(createGameWindow);