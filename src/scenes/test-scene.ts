import { easyAngle360 } from "../util/math-ops";

export class TestScene extends Phaser.Scene {
    head: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = null;
    body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
    tail: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = null;
    parallax: Phaser.GameObjects.TileSprite[] = [];

    constructor() {
        super("TestScene");
    }

    preload() {
        this.load.image('snake_head', 'assets/snake/head.png');
        this.load.image('snake_body', 'assets/snake/body.png');
        this.load.image('snake_tail', 'assets/snake/tail.png');
        this.load.image('parallax1', 'assets/parallax1.png');
        this.load.image('parallax2', 'assets/parallax2.png');
        this.load.image('parallax3', 'assets/parallax3.png');
        this.load.image('parallax4', 'assets/parallax4.png');
    }

    create() {
        for (let i = 1; i <= 4; i++) {
            this.parallax[i - 1] = this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, `parallax${i}`).setOrigin(0);
        }

        this.tail = this.physics.add.sprite(100, 100, 'snake_tail').setScale(2);
        for (let i = 0; i < 50; i++) {
            this.body.push(this.physics.add.sprite(100, 100, 'snake_body').setScale(2));
        }
        this.head = this.physics.add.sprite(100, 100, 'snake_head').setScale(2).setCollideWorldBounds(true, 1, 1);
    }

    update() {
        this.moveParallax();
        this.moveWorm();
        if (this.input.activePointer.isDown) {
            this.changeWormDirection();
        }
    }

    moveParallax() {
        for (let i = 0; i < 4; i++) {
            this.parallax[i].tilePositionY += i*2 + 1;
        }
    }

    changeWormDirection() {
        let d = Phaser.Math.Distance.Between(this.head.x, this.head.y, this.input.activePointer.x, this.input.activePointer.y);
        if (Math.abs(d) > 15)
            this.physics.moveToObject(this.head, this.input.activePointer, 200);
    }

    moveWorm() {
        let N = this.body.length;
        // Set angle of head
        this.head.setAngle(Phaser.Math.RadToDeg(Math.atan2(this.head.body.velocity.y, this.head.body.velocity.x)) + 90);

        // First body segment angle and movement
        let hAngle = -easyAngle360(this.body[0], this.head) - 90;
        this.body[0].setAngle(hAngle);
        let d = Phaser.Math.Distance.Between(this.body[0].x, this.body[0].y, this.head.x, this.head.y);
        if (Math.abs(d) > 60) {
            this.physics.moveToObject(this.body[0], this.head, 200);
        }

        // All other body segments angle and movement
        for (let i = 1; i < N; i++) {
            hAngle = -easyAngle360(this.body[i], this.body[i - 1]) - 90;
            this.body[i].setAngle(hAngle);
            d = Phaser.Math.Distance.Between(this.body[i].x, this.body[i].y, this.body[i - 1].x, this.body[i - 1].y);
            if (Math.abs(d) > 44) {
                this.physics.moveToObject(this.body[i], this.body[i - 1], 200);
            }
        }

        // Tail angle and movement
        hAngle = -easyAngle360(this.tail, this.body[N - 1]) - 90;
        this.tail.setAngle(hAngle);
        d = Phaser.Math.Distance.Between(this.tail.x, this.tail.y, this.body[N - 1].x, this.body[N - 1].y);
        if (Math.abs(d) > 44) {
            this.physics.moveToObject(this.tail, this.body[N - 1], 200);
        }
    }
}