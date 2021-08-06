import * as Phaser from 'phaser';
// import { BootScene } from './scenes/boot';

import { Plugins } from '@capacitor/core';
import { BASE_SIZE, SCREEN_WIDE, SCREEN_RATIO } from './constants';
import { readFile, writeFile } from './util/file-ops';

const config: Phaser.Types.Core.GameConfig = {
    parent: 'game',
    type: Phaser.AUTO,
    backgroundColor: '#000',
    // Example of sizing based on w/h ratio
    width: SCREEN_WIDE ? BASE_SIZE * SCREEN_RATIO : BASE_SIZE,
    height: SCREEN_WIDE ? BASE_SIZE : BASE_SIZE / SCREEN_RATIO,
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

        // File-ops write test
        writeFile('kt_fileops_test.txt', "Hello there")
            .then(() => {
                // File-ops read test
                readFile('kt_fileops_test.txt')
                    .then(text => console.log("File read: ", text));
            });

        StatusBar.hide();
        SplashScreen.hide();

    }

}

new KTGame(config);