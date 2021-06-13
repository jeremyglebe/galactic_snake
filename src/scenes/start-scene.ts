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
    scoresText: Phaser.GameObjects.Text = null;

    constructor() {
        super("StartScene");
        this.fire = FirebaseService.get();
    }

    create() {
        // Width and height of game
        let w = <number>this.game.config.width;
        let h = <number>this.game.config.height;
        // Create a still background of parallax images
        for (let i = 1; i <= 4; i++) {
            this.add.tileSprite(0, 0, this.sys.canvas.width, this.sys.canvas.height, `parallax${i}`).setOrigin(0);
        }
        // Create the buttons of the UI
        this.createUI();
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

    createUI() {
        // Width and height of game
        const w = <number>this.game.config.width;
        const h = <number>this.game.config.height;
        // Rectangle to click to continue, covers full screen
        let r = this.add.rectangle(0, 0, w, h, 0).setOrigin(0);
        // Make the rectangle clickable
        r.setInteractive().on('pointerdown', this.startGame, this);
        // Rectangle is mostly invisible to show background, but dark
        // enough to highlight text
        r.setAlpha(0.25);
        // Create the play button
        this.createPlayText();
        // Firebase UI for sign in
        this.createFirebaseUI();
        // Create scoreboard
        this.createHighScoreTable();
    }

    createPlayText() {
        // Width and height of game
        const w = <number>this.game.config.width;
        const h = <number>this.game.config.height;
        // Prompt to start the game
        this.playTextObj = this.add.text(w / 2, 25, "Tap anywhere to play as",
            {
                color: UITXT,
                fontSize: '24px',
                fontFamily: 'consolas',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        // Username text
        this.usernameText = this.add.text(w / 2, 75, "Guest",
            {
                color: UITXT,
                fontSize: '34px',
                fontFamily: 'consolas',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        // Animation
        this.tweens.add({
            targets: [this.usernameText],
            duration: 1250,
            yoyo: true,
            repeat: -1,
            alpha: 0
        });
    }

    createFirebaseUI() {
        // Width and height of game
        const w = <number>this.game.config.width;
        const h = <number>this.game.config.height;
        // Positioning
        const y = h - 215;
        // Create the button
        this.googleButton = this.add.image(w / 2, y, 'google')
            .setScale(1.4)
            .setInteractive()
            .on('pointerdown', this.fire.signInWithGoogle);
        // Create logout button
        this.logoutButton = this.add.rectangle(w / 2, y, 220, 50, UIBTN)
            .setInteractive()
            .on('pointerdown', this.fire.signOut);
        this.logoutText = this.add.text(w / 2, y, "Logout",
            {
                color: UITXT,
                fontSize: '20px',
                fontFamily: 'consolas',
                fontStyle: 'bold'
            }).setOrigin(0.5).setAlpha(0);
    }

    async createHighScoreTable() {
        // Width and height of game
        const w = <number>this.game.config.width;
        const h = <number>this.game.config.height;
        const x = w / 2;
        const y = 120;
        // Define limit of total scores to retrieve from database
        // Each score will occupy 36px of height. There is room for around 7
        // in the smallest height settings. So, for each 42px above 800h, one
        // more score will be allowed
        const limit = 7 + Math.floor((h - 800) / 42)
        // Create the score table text
        this.scoresText = this.add.text(x, y, ' '.repeat(10) + "High Scores", {
            fontSize: '36px',
            fontFamily: 'Courier New',
            color: UITXT
        }).setOrigin(0.5, 0);
        // Add a neat little bar of asterisks
        this.scoresText.text += '\n' + '*'.repeat(30) + '\n';
        // Create a reference to a specific query on the scores collection
        let query = await this.fire.scoresCollection
            .orderBy('score', 'desc')
            .limit(limit);
        // Get a snapshot of the query from the database
        let snap = await query.get();
        // Populate the table with the values from the database
        snap.forEach(
            (docSnap) => {
                const data = docSnap.data();
                const { name, score } = data;
                let scoreString = `${score}`.padStart(7, ' ');
                let nameString = name.length > 15 ? name.substr(0, 15) : name.padStart(15, ' ');
                this.scoresText.text += `  ${nameString}... ${scoreString}\n`;
            }
        );
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