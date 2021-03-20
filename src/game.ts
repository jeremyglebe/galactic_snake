import * as Phaser from 'phaser';
// import { BootScene } from './scenes/boot';

import { Plugins } from '@capacitor/core';
import { BASE_SIZE, SCREEN_WIDE, SCREEN_RATIO } from './constants';
import { readFile, writeFile } from './util/file-ops';
import { TestScene } from './scenes/test-scene';

// const config: Phaser.Types.Core.GameConfig = {
const config: any = {
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
    },
    physics: {
        default: 'arcade'
    }
};

const { StatusBar, SplashScreen } = Plugins;

export class KTGame extends Phaser.Game {

    constructor(config: Phaser.Types.Core.GameConfig) {

        super(config);

        // Example of scene management
        this.scene.add('TestScene', TestScene, true);

        StatusBar.hide();
        SplashScreen.hide();

    }

}

new KTGame(config);