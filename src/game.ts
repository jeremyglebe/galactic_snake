import * as Phaser from 'phaser';
// import { BootScene } from './scenes/boot';

import { Plugins } from '@capacitor/core';
import { SCREEN_WIDE, SCREEN_RATIO } from './constants';
import { readFile, writeFile } from './util/file-ops';

const config: Phaser.Types.Core.GameConfig = {
    parent: 'game',
    type: Phaser.AUTO,
    backgroundColor: '#000',
    // Example of sizing based on w/h ratio
    width: SCREEN_WIDE ? 800 * SCREEN_RATIO : 800,
    height: SCREEN_WIDE ? 800 : 800 / SCREEN_RATIO,
    zoom: 1,
    dom: {
        createContainer: true
    },
    render: {
        pixelArt: true,
        roundPixels: true
    },
    scale: {
        mode: Phaser.Scale.FIT
    }
};

const { StatusBar, SplashScreen } = Plugins;

export class KTGame extends Phaser.Game {

    constructor(config: Phaser.Types.Core.GameConfig) {

        super(config);

        // Example of scene management
        // this.scene.add('Boot', BootScene, false);
        // this.scene.start('Boot');

        // File-ops write test
        writeFile(
            {
                location: 'app',
                filePath: 'kt_fileops_test.txt',
                webResolve: 'ram'
            },
            "Hello there"
        ).then(
            () => {
                // File-ops read test
                readFile(
                    {
                        location: 'app',
                        filePath: 'kt_fileops_test.txt',
                        webResolve: 'ram'
                    }
                ).then(
                    text => console.log("File read: ", text)
                );
            });

        StatusBar.hide();
        SplashScreen.hide();

    }

}

new KTGame(config);