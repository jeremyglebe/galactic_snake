// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";
// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAhc4pH_QuLo4e27qy9LJqoWsWJOeGdq_I",
    authDomain: "galactic-snake.firebaseapp.com",
    projectId: "galactic-snake",
    storageBucket: "galactic-snake.appspot.com",
    messagingSenderId: "650772183646",
    appId: "1:650772183646:web:200e04589d91d71d7492cf",
    measurementId: "G-7NYSSXQSXB"
}

export class FirebaseService {

    private static instance: FirebaseService;
    app: firebase.app.App = null;
    scoresCollection: firebase.firestore.CollectionReference;

    // Private constructor to create first singleton instance
    private constructor() {
        // Initialize Firebase
        this.app = firebase.initializeApp(firebaseConfig);
        // firebase.analytics();
        this.scoresCollection = this.app.firestore().collection('user_highscores');
    }

    // Get method for singleton
    static get(): FirebaseService {
        if (!FirebaseService.instance) {
            FirebaseService.instance = new FirebaseService();
        }
        return FirebaseService.instance;
    }

    async getHighScore() {
        try {
            let u = this.user();
            if (u) {
                let doc = await this.scoresCollection.doc(u.uid).get();
                if (doc.exists) {
                    let data = doc.data();
                    return data['score'];
                }
            }
        } catch (e) {
            throw e;
        }
        return 3;

    }

    setHighScore(score) {
        let u = this.user();
        if (u) {
            this.scoresCollection.doc(u.uid).set({
                name: u.displayName,
                score: score
            }).then(() => {
                console.log("High score updated in cloud!");
            }).catch((error) => {
                console.error("Error updating high score: ", error);
            });
        }
    }

    async signInWithGoogle() {
        // Sign in with google
        var provider = new firebase.auth.GoogleAuthProvider();
        try {
            return await firebase.auth().signInWithPopup(provider);
        }
        catch (e) {
            throw (e);
        }
    }

    async signOut() {
        // Sign in with google
        try {
            await firebase.auth().signOut();
        }
        catch (e) {
            throw (e);
        }
    }

    user(): firebase.User {
        if (this.app)
            return this.app.auth().currentUser;
        else
            return null;
    }
}
export type FirebaseUser = firebase.User;