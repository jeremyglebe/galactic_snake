export class BootScene extends Phaser.Scene {
    constructor() {
        super("BootScene");
    }
    preload() {
        this.load.image('snake_head', 'assets/snake/head.png');
        this.load.image('snake_body', 'assets/snake/body.png');
        this.load.image('snake_tail', 'assets/snake/tail.png');
        for (let i = 1; i <= 4; i++) this.load.image(`parallax${i}`, `assets/parallax/parallax${i}.png`);
        for (let i = 1; i <= 4; i++) this.load.image(`planet${i}`, `assets/planets/planet${i}.png`);
        this.load.image('ship', 'assets/ship.png');
        // Sounds and music
        this.load.audio('bg', 'assets/sound/slow-travel.wav');
        this.load.audio('start-level', 'assets/sound/start-level.wav');
        this.load.audio('roar', 'assets/sound/scream.wav');
        this.load.audio('eat', 'assets/sound/SCIEnrg_Energy Orb_05.wav');
        this.load.audio('hurt', 'assets/sound/UIGlitch_Error Tone_03.wav');
    }
    create() {
        this.scene.start("StartScene");
    }
}
