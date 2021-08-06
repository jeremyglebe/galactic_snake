import { Capacitor } from "@capacitor/core";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

// The data prefix is used as the name of the folder in which to store files
// This may be a subdirectory of the app or a subdirectory of a data or
// documents folder, depending entirely on platform.
export const DATA_PREFIX: string = 'ktgs';

// Upon importing, log the read/write platform in use
console.log("Read/Write platform: ", Capacitor.getPlatform());

// These variables are used when importing node libraries for electron file
// ops. The variables must exist for compilation even if we aren't able to
// import those libraries, so we initialize them to null.
var fs: any = null;
var path: any = null;
var app: any = null;
try {
    // Import node libraries for filesystem if possible
    // (Meaning we're using electron)
    fs = window.require('fs');
    path = window.require('path');
    app = window.require('electron').remote.app
} catch (e) {
    // Log if the full filesystem is not available through node
    if (Capacitor.getPlatform() != 'electron') {
        console.log("Full filesystem access not available. (This is normal on mobile and web)");
    }
    // If we are unable to import libraries, but SHOULD be using electron, print an error
    else {
        console.log("Full filesystem access not available:", e);
    }
}

export async function readFile(file: string): Promise<string> {
    // If platform is electron, run internal electron read function
    if (Capacitor.getPlatform() == "electron") {
        return await _electronRead(file);
    }
    // If platform is mobile, run internal mobile read function
    else if (Capacitor.getPlatform() == 'ios' || Capacitor.getPlatform() == 'android') {
        return await _mobileRead(file);
    }
    // As a fallback, run the simulated web read
    else {
        return await _webSimulateRead(file);
    }
}

export async function writeFile(file: string, data: string): Promise<void> {
    // If platform is electron, run internal electron write function
    if (Capacitor.getPlatform() == "electron") {
        await _electronWrite(file, data);
    }
    // If platform is mobile, run internal mobile write function
    else if (Capacitor.getPlatform() == 'ios' || Capacitor.getPlatform() == 'android') {
        await _mobileWrite(file, data);
    }
    // As a fallback, run the simulated web write
    else {
        await _webSimulateWrite(file, data);
    }
}

async function _electronRead(file: string): Promise<string> {
    // Read from folder in app directory "appdata/"
    return fs.readFileSync(path.resolve(app.getAppPath(), DATA_PREFIX, file), { encoding: 'ascii' });
}

async function _electronWrite(file: string, data: string): Promise<void> {
    // Save files to the directory of the application in a folder "appdata/"
    try {
        fs.accessSync(path.resolve(app.getAppPath(), DATA_PREFIX));
    } catch {
        fs.mkdirSync(path.resolve(app.getAppPath(), DATA_PREFIX));
    }
    fs.writeFileSync(path.resolve(app.getAppPath(), DATA_PREFIX, file), data, { encoding: 'ascii' });

}

async function _mobileRead(file: string): Promise<string> {
    let directory: any;
    // Read from the devices data folder
    return (await Filesystem.readFile(
        {
            directory: Directory.Data,
            path: `${DATA_PREFIX}/${file}`,
            encoding: Encoding.ASCII
        }
    )).data;
}

async function _mobileWrite(file: string, data: string): Promise<void> {
    // Save to the default data directory of the system. May overlap with documents
    await Filesystem.writeFile(
        {
            directory: Directory.Data,
            path: `${DATA_PREFIX}/${file}`,
            data: data,
            encoding: Encoding.ASCII
        }
    );
}

async function _webSimulateRead(file: string): Promise<string> {
    // Get a parsed object from the text saved in storage
    const obj = JSON.parse(localStorage.getItem(DATA_PREFIX));
    // Check if there even was existing save data
    if (obj) {
        // Using local storage to simulate reads, make a javascript call
        return obj[file];
    }
    else { return null; }
}

async function _webSimulateWrite(file: string, data: string): Promise<void> {
    // Get a parsed object from the text saved in storage
    let obj = JSON.parse(localStorage.getItem(DATA_PREFIX));
    // Check if there even was existing save data
    if (obj) {
        // Update the object with our new "file"
        obj[file] = data;
    }
    else {
        // Create a new object, since there is none to update
        obj = {};
        obj[file] = data;
    }
    // Store the object back into local storage
    localStorage.setItem(DATA_PREFIX, JSON.stringify(obj));
}
