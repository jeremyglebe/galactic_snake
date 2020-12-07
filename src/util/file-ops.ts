import { Capacitor, Plugins, FilesystemDirectory } from "@capacitor/core";
// import * as fs from 'fs';
// import * as path from 'path';
const { Filesystem } = Plugins;
var fs: any = null;
var path: any = null;

try {
    fs = window.require('fs');
    path = window.require('path');
} catch (e) {
    console.log("Full filesystem access not available. (Are we on mobile/web?)");
}

console.log("Read/Write platform: ", Capacitor.platform);

export interface FileSpecifier {
    // relative path to the file from the directory
    filePath: string,
    // The root directory to use on desktops. This property is only used if
    // location is set to 'data'. 'app' will use a subfolder in electron app.
    // 'documents' will match files in the OS documents folder.
    desktopDataDirectory?: string
    // Preset directories to use as root.
    // Valid choices are: documents, data, app
    // For mobile, 'documents' and 'data' work as described here:
    // https://capacitorjs.com/docs/apis/filesystem#filesystemdirectory
    // For mobile, 'app' works just like 'data'. (We can't save to app directory on mobile)
    // For electron/desktop:
    // 'documents' should save to the OS's documents folder
    // 'data' should save to a folder specified in the desktopDataDirectory property
    // 'app' will save to a subdirectory of the app, 'appdata/'
    location: string,
    // When using web (such as dev server) how should we resolve save/load
    // operations? (web does not have access to filesystem)
    // THIS STILL NEEDS IMPLEMENTATION!!!!!!!
    // Choices are:
    //   - ram: simulate storage by putting data in main memory,
    //          no persistence after reload
    //   - local: use browser localStorage, the browser frequently cleans
    //            this, so it is not a long-term storage solution
    //   - pass (default): ignore the save/load statement, ensure the op is
    //           non-critical before using this.
    webResolve?: string
}

export async function writeFile(file: FileSpecifier, data: string): Promise<boolean> {
    if (Capacitor.platform == "electron") {
        if (file.location == 'app') {
            try {
                await fs.writeFileSync(path.resolve(__dirname, 'appdata', file.filePath), data);
                return true;
            } catch {
                return false;
            }
        } else if (file.location == 'documents') {
            try {
                await Filesystem.writeFile(
                    {
                        directory: FilesystemDirectory.Documents,
                        path: file.filePath,
                        data: data
                    }
                );
                return true;
            } catch {
                return false;
            }
        } else {
            try {
                await fs.writeFileSync(path.resolve(file.desktopDataDirectory, file.filePath), data);
                return true;
            } catch {
                return false;
            }
        }
    } else if (Capacitor.platform == 'ios' || Capacitor.platform == 'android') {
        let directory: any;
        if (file.location == 'documents') directory = FilesystemDirectory.Documents;
        else if (file.location == 'data') directory = FilesystemDirectory.Data;
        else directory = FilesystemDirectory.Data;
        try {
            await Filesystem.writeFile(
                {
                    directory: directory,
                    path: file.filePath,
                    data: data
                }
            );
            return true;
        } catch {
            return false;
        }
    }
    // Define behavior on web here
    // THIS NEEDS IMPLEMENTATION!!!!!!!!
    else {
        return false;
    }
}
export async function readFile(file: FileSpecifier): Promise<string> {
    if (Capacitor.platform == "electron") {
        if (file.location == 'app') {
            return fs.readFileSync(path.resolve(__dirname, 'appdata', file.filePath)).toString();
        } else if (file.location == 'documents') {
            return (await Filesystem.readFile(
                {
                    directory: FilesystemDirectory.Documents,
                    path: file.filePath
                }
            )).data;
        } else {
            return fs.readFileSync(path.resolve(file.desktopDataDirectory, file.filePath)).toString();
        }
    } else if (Capacitor.platform == 'ios' || Capacitor.platform == 'android') {
        let directory: any;
        if (file.location == 'documents') directory = FilesystemDirectory.Documents;
        else if (file.location == 'data') directory = FilesystemDirectory.Data;
        else directory = FilesystemDirectory.Data;
        return (await Filesystem.readFile(
            {
                directory: directory,
                path: file.filePath
            }
        )).data;
    }
    // Define behavior on web here
    // THIS NEEDS IMPLEMENTATION!!!!!!!!
    else {
        return null;
    }
}