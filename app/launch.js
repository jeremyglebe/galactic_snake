const { app, BrowserWindow } = require('electron');

// Can't figure out why but these lines don't seem to be running...
console.log("Not running dev mode");
// Include tools in development environments
if (process.env.NODE_ENV == "development") {
    console.log("Running in development mode.");
    // The window will refresh anytime any files in the app/ folder change
    require('electron-reload')(__dirname);
}

function createGameWindow() {

    setInterval(console.log, 100, "FUASOGBUOSAB");

    // Create a browser window for the game to be displayed in
    const gameWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true
        }
    });
    // Load the main HTML file in the game window
    gameWindow.loadFile('app/index.html');
}
// When electron is ready, start the game's display window
app.whenReady().then(createGameWindow);