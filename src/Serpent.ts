import { easyAngle360 } from "./util/math-ops";

export class Serpent {
    scene: Phaser.Scene;
    head: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = null;
    body: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
    tail: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = null;

    constructor(scene) {
        this.scene = scene;
        // Create body parts
        this.tail = scene.physics.add.sprite(0, 0, 'snake_tail')
            .setScale(2)
            .setBodySize(10, 10);
        this.body.push(scene.physics.add.sprite(0, 0, 'snake_body')
            .setScale(2)
            .setBodySize(20, 20));
        // Head is offset a bit from the other stuff
        this.head = scene.physics.add.sprite(45, 45, 'snake_head').setScale(2)
            .setCollideWorldBounds(true, 1, 1)
            .setDepth(1)
            .setBodySize(20, 20);
        // Starting motion
        this.scene.physics.moveTo(this.head, 100, 100, 200);
    }

    update() {
        // Move the worm
        this.moveWorm();
        // If they click, change direction
        if (this.scene.input.activePointer.isDown) {
            this.changeWormDirection();
        }
    }

    addSegment() {
        // Create a new body segment at the tail
        let seg = this.scene.physics.add.sprite(this.tail.x, this.tail.y, 'snake_body')
            .setScale(2)
            .setBodySize(20, 20);
        this.body.push(seg);
        let size = this.body.length;
        this.scene.physics.add.overlap(this.head, seg, () => {
            let deadBody = this.body.splice(size - 1);
            this.scene.tweens.add({
                targets: deadBody,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    deadBody.forEach((seg) => {
                        seg.destroy();
                    });
                }
            });
            this.scene.sound.play('hurt');
        });
    }

    getLength() { return 2 + this.body.length; }

    changeWormDirection() {
        let d = Phaser.Math.Distance.BetweenPoints(this.head, this.scene.input.activePointer);
        if (Math.abs(d) > 15)
            this.scene.physics.moveToObject(this.head, this.scene.input.activePointer, 200);
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
            this.scene.physics.moveToObject(this.body[0], this.head, 200);
        }

        // All other body segments angle and movement
        for (let i = 1; i < N; i++) {
            hAngle = -easyAngle360(this.body[i], this.body[i - 1]) - 90;
            this.body[i].setAngle(hAngle);
            d = Phaser.Math.Distance.Between(this.body[i].x, this.body[i].y, this.body[i - 1].x, this.body[i - 1].y);
            if (Math.abs(d) > 44) {
                this.scene.physics.moveToObject(this.body[i], this.body[i - 1], 200);
            }
        }

        // Tail angle and movement
        hAngle = -easyAngle360(this.tail, this.body[N - 1]) - 90;
        this.tail.setAngle(hAngle);
        d = Phaser.Math.Distance.Between(this.tail.x, this.tail.y, this.body[N - 1].x, this.body[N - 1].y);
        if (Math.abs(d) > 90) {
            this.scene.physics.moveToObject(this.tail, this.body[N - 1], 300);
        }
        else if (Math.abs(d) > 44) {
            this.scene.physics.moveToObject(this.tail, this.body[N - 1], 200);
        }
        else {
            this.scene.physics.moveToObject(this.tail, this.body[N - 1], 80);
        }
    }
}