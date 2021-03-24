import { UIBTN, UITXT } from "../constants";
import { FirebaseService, FirebaseUser } from "../FirebaseService";

export class StartScene extends Phaser.Scene {

    fire: FirebaseService = null;
    user: FirebaseUser = null;
    googleButton: Phaser.GameObjects.Image = null;
    logoutButton: Phaser.GameObjects.Rectangle = null;
    playTextObj: Phaser.GameObjects.Text = null;
    usernameText: Phaser.GameObjects.Text = null;
    logoutText: Phaser.GameObjects.Text = null;

    constructor() {
        super("StartScene");
        this.fire = FirebaseService.get();
    }

    create() {
        // Width and height of game
        let w = <number>this.game.config.width;
        let h = <number>this.game.config.height;
        // Rectangle to click to continue, takes up whole screen
        let r = this.add.rectangle(w / 2, h / 2 - 150, 600, 150, UIBTN)
            .setInteractive()
            .on('pointerdown', this.startGame, this);
        // Prompt to start the game
        this.playTextObj = this.add.text(r.x, r.y - 30, "Play as",
            {
                color: UITXT,
                fontSize: '48px',
                fontFamily: 'consolas',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        // Username text
        this.usernameText = this.add.text(r.x, r.y + 30, "Guest",
            {
                color: UITXT,
                fontSize: '48px',
                fontFamily: 'consolas',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        // Firebase UI for sign in
        this.createFirebaseUI();
        // Create instructions
        this.createInstructions();
    }

    update() {
        this.user = this.fire.user();
        // User is signed in
        if (this.user) {
            // Update username on the button
            this.usernameText.setText(this.user.displayName);
            // Disable the google button
            this.disableObj(this.googleButton);
            // Enable to logout button
            this.enableObj(this.logoutButton);
            this.logoutText.setAlpha(1);
        }
        // User is not signed in
        else {
            // Update username on the button
            this.usernameText.setText("Guest");
            // Enable the google button
            this.enableObj(this.googleButton);
            // Disable to logout button
            this.disableObj(this.logoutButton);
            this.logoutText.setAlpha(0);
        }
    }

    createFirebaseUI() {
        let w = <number>this.game.config.width;
        let h = <number>this.game.config.height;
        let x = w / 2;
        let y = h / 2 + 40;
        this.googleButton = this.add.image(x, y, 'google')
            .setScale(2.2)
            .setInteractive()
            .on('pointerdown', this.fire.signInWithGoogle);
        // Create logout button
        this.logoutButton = this.add.rectangle(x, y, 350, 100, UIBTN)
            .setInteractive()
            .on('pointerdown', this.fire.signOut);
        this.logoutText = this.add.text(x, y, "Logout",
            {
                color: UITXT,
                fontSize: '36px',
                fontFamily: 'consolas',
                fontStyle: 'bold'
            }).setOrigin(0.5).setAlpha(0);
    }

    createInstructions() {
        // Width and height of game
        let w = <number>this.game.config.width;
        let h = <number>this.game.config.height;
        // Create instructions text
        let intrConf = {
            color: UITXT,
            fontSize: '20px',
            fontFamily: 'consolas'
        }
        this.add.text(w / 2, h - 150, "Game Instructions", intrConf).setOrigin(0.5);
        this.add.text(w / 2, h - 110, "Click/Tap to control the snake", intrConf).setOrigin(0.5);
        this.add.text(w / 2, h - 80, "Click/Tap the cloud in the top-right corner", intrConf).setOrigin(0.5);
        this.add.text(w / 2, h - 55, "to upload your score to the cloud", intrConf).setOrigin(0.5);
        let g = this.add.graphics();
        g.lineStyle(2, 0xffffff, 1);
        g.strokeRect(w / 2 - 250, h - 130, 500, 100);
    }

    disableObj(obj) {
        obj.disableInteractive();
        obj.setAlpha(0);
    }

    enableObj(obj) {
        obj.setInteractive();
        obj.setAlpha(1);
    }

    startGame() {
        this.scene.start('SpaceScene');
    }
}