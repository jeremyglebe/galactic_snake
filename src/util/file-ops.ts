import { Capacitor, Plugins, FilesystemDirectory } from "@capacitor/core";
import * as fs from 'fs';
import * as path from 'path';
const { Filesystem } = Plugins;

console.log("Read/Write platform: ", Capacitor.platform);

export interface FileSpecifier {
    // relative path to the file from the directory
    filePath: string,
    // directory to use on desktops
    desktopDir: string
    // directory is automatically selected based on preset storage
    // locations on mobile. valid choices are: documents, data, app
    mobilePresetDir: string,
    // when using web (such as dev server) how should we resolve save/load
    // operations? (web does not have access to filesystem)
    // THIS STILL NEEDS IMPLEMENTATION!!!!!!!
    // Choices are:
    //   - ram: simulate storage by putting data in main memory,
    //          no persistence after reload
    //   - pass: ignore the save/load statement, ensure the op is
    //           non-critical before using this.
    //   - local: use browser localStorage, the browser frequently cleans
    //            this, so it is not a long-term storage solution
    webResolve: string
}

export async function writeFile(file: FileSpecifier, data: string): Promise<boolean> {
    if (Capacitor.platform == "electron") {
        try {
            await fs.writeFileSync(path.resolve(file.desktopDir, file.filePath), data);
            return true;
        } catch{
            return false;
        }
    } else if (Capacitor.platform == 'ios' || Capacitor.platform == 'android') {
        let directory: any;
        if (file.mobilePresetDir == 'documents') directory = FilesystemDirectory.Documents;
        else if (file.mobilePresetDir == 'data') directory = FilesystemDirectory.Data;
        else directory = FilesystemDirectory.Application;
        try {
            await Filesystem.writeFile(
                {
                    directory: directory,
                    path: file.filePath,
                    data: data
                }
            );
            return true;
        } catch{
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
        return fs.readFileSync(path.resolve(file.desktopDir, file.filePath)).toString();
    } else if (Capacitor.platform == 'ios' || Capacitor.platform == 'android') {
        let directory: any;
        if (file.mobilePresetDir == 'documents') directory = FilesystemDirectory.Documents;
        else if (file.mobilePresetDir == 'data') directory = FilesystemDirectory.Data;
        else directory = FilesystemDirectory.Application;
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