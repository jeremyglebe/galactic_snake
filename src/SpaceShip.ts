import { Serpent } from "./Serpent";

export class SpaceShip {
    scene: Phaser.Scene;
    sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = null;
    snake: Serpent;
    aiState: () => void;

    constructor(scene, snake, x, y) {
        this.scene = scene;
        this.snake = snake;
        this.sprite = scene.physics.add.sprite(x, y, 'ship');
    }

    aiCruise() {

    }

    calculateNearestSegment() {
        
    }
}