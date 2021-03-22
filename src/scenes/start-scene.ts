export class StartScene extends Phaser.Scene {
    constructor() {
        super("StartScene");
    }

    create() {
        let w = <number>this.game.config.width;
        let h = <number>this.game.config.height;
        this.add.text(w / 2, h / 2 - 40, "Click or Tap",
            {
                color: 'white',
                fontSize: '90px',
                fontFamily: 'consolas',
                fontStyle: 'bold'
            }).setOrigin(0.5);
    }

    update() {
        if (this.input.activePointer.isDown) {
            this.scene.start('SpaceScene');
        }
    }
}