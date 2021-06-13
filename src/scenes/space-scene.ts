import { UITXT } from "../constants";
import { FirebaseService, FirebaseUser } from "../FirebaseService";
import { Serpent } from "../Serpent";

export class SpaceScene extends Phaser.Scene {
    fire: FirebaseService = null;
    user: FirebaseUser = null;
    parallax: Phaser.GameObjects.TileSprite[] = [];
    serpent: Serpent;
    currScoreText: Phaser.GameObjects.Text;
    maxScoreText: Phaser.GameObjects.Text;
    saveText: Phaser.GameObjects.Text;
    cloudStatusText: Phaser.GameObjects.Text;
    lastSpawn: number;
    spawnWait: number;
    maxSnakeSize: number;
    lastSavedSize: number;

    constructor() {
        super("SpaceScene");
        this.spawnWait = 3000;
        this.lastSpawn = 0;
        this.fire = FirebaseService.get();
        this.maxSnakeSize = 3;
        this.lastSavedSize = 3;
    }

    create() {
        this.user = this.fire.user();
        let w = <number>this.game.config.width;
        for (let i = 1; i <= 4; i++) {
            this.parallax[i - 1] = this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, `parallax${i}`).setOrigin(0);
        }
        this.serpent = new Serpent(this);
        // let ship = new SpaceShip(this, this.serpent, 300, 300);
        this.currScoreText = this.add.text(w / 2, 30, "3", {
            color: UITXT,
            fontSize: '45px',
            fontFamily: 'consolas',
            fontStyle: 'bold'
        }).setAlpha(0.5).setOrigin(0.5);
        this.maxScoreText = this.add.text(w / 2, 70, "3", {
            color: UITXT,
            fontSize: '30px',
            fontFamily: 'consolas',
            fontStyle: 'bold'
        }).setAlpha(0.5).setOrigin(0.5);
        // Play level start sound
        let s = this.sound.add('start-level');
        let m = this.sound.add('bg', { loop: true, volume: 0.5 });
        s.on('complete', () => {
            m.play();
        });
        s.play();

        if (this.user) {
            // Get high score from the cloud
            this.fire.getMyHighScore().then((score) => {
                this.maxSnakeSize = score;
                this.lastSavedSize = score;
            });
            // Handle saving to cloud
            this.saveText = this.add.text(w - 50, 50, "☁", {
                color: UITXT,
                fontSize: '90px',
                fontFamily: 'consolas',
                fontStyle: 'bold'
            });
            this.saveText.setInteractive();
            // Event to manually save to the cloud
            this.saveText.on('pointerdown', () => {
                this.fire.setMyHighScore(this.maxSnakeSize);
                this.lastSavedSize = this.maxSnakeSize;
            });
            this.saveText.setAlpha(0.5).setOrigin(0.5)
            this.cloudStatusText = this.add.text(w - 30, 30, "√", {
                color: UITXT,
                fontSize: '30px',
                fontFamily: 'consolas',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }
    }

    update() {
        let w = <number>this.game.config.width;
        this.moveParallax();
        this.serpent.update();
        if ((new Date()).getTime() > this.lastSpawn + this.spawnWait) {
            this.spawnPlanet();
        }
        // Update the score text
        this.currScoreText.setText('' + this.serpent.getLength());
        this.maxScoreText.setText('' + this.maxSnakeSize);
        if (this.user) {
            // Determine if the user has saved their score
            if (this.maxSnakeSize > this.lastSavedSize) {
                this.cloudStatusText.setText('*');
                window.onbeforeunload = () => { return "" };
            } else {
                this.cloudStatusText.setText('√');
                window.onbeforeunload = null;
            }
        }
    }

    moveParallax() {
        for (let i = 0; i < 4; i++) {
            this.parallax[i].tilePositionY += i * 2 + 1;
        }
    }

    spawnPlanet() {
        let pnum = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
        let planet = this.physics.add.image(Math.random() * (this.sys.canvas.width - 10) + 5, this.sys.canvas.height, `planet${pnum}`);
        planet.setVelocity(0, -100);
        planet.setScale(Math.random() * 1.5 + 2)
        this.lastSpawn = (new Date()).getTime();
        let ov = this.physics.add.overlap(this.serpent.head, planet, () => {
            ov.destroy();
            this.tweens.add({
                targets: [planet],
                alpha: 0,
                scale: 0.25,
                angle: 359,
                duration: 250,
                onComplete: () => {
                    planet.destroy();
                    this.serpent.addSegment();
                    // Update max snake length
                    if (this.serpent.getLength() > this.maxSnakeSize) {
                        this.maxSnakeSize = this.serpent.getLength();
                        // Update the high score in the firestore database
                        this.fire.setMyHighScore(this.maxSnakeSize).then((success) => {
                            if (success) {
                                // Update the last saved size if it worked
                                this.lastSavedSize = this.maxSnakeSize;
                            }
                        });
                    }
                    // Play a really cool sound every 10 segs
                    if (this.serpent.getLength() % 10 == 0) {
                        this.sound.play('roar');
                    }
                }
            });
            // Play eating sound
            this.sound.play('eat');
        });
    }

}