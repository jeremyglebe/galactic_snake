// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import { initializeApp, FirebaseApp } from "firebase/app";
// Add the Firebase services that you want to use
import {
    Auth, getAuth, User,
    GoogleAuthProvider, signInWithPopup, signOut
} from "firebase/auth";
import {
    Firestore, getFirestore,
    CollectionReference, collection,
    doc, setDoc, getDoc
} from "firebase/firestore";

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
    app: FirebaseApp = null;
    db: Firestore = null;
    auth: Auth = null;
    scoresCollection: CollectionReference;

    // Private constructor to create first singleton instance
    private constructor() {
        // Initialize Firebase
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app);
        // firebase.analytics();
        this.scoresCollection = collection(this.db, 'user_highscores');
    }

    // Get method for singleton
    static get(): FirebaseService {
        if (!FirebaseService.instance) {
            FirebaseService.instance = new FirebaseService();
        }
        return FirebaseService.instance;
    }

    async getMyHighScore() {
        try {
            let u = this.user();
            if (u) {
                let targetDoc = await doc(this.scoresCollection, u.uid);
                let docObj = await getDoc(targetDoc);
                if (docObj.exists) {
                    let data = docObj.data();
                    return data['score'];
                }
            }
        } catch (e) {
            throw e;
        }
        return 3;

    }

    async setMyHighScore(score): Promise<boolean> {
        let u = this.user();
        if (u) {
            try {
                const targetDoc = await doc(this.scoresCollection, u.uid);
                await setDoc(targetDoc, {
                    name: u.displayName,
                    score: score
                });
                console.log("High score updated in cloud!");
                return true;
            }
            catch (error) {
                console.error("Error updating high score: ", error);
                return false;
            }
        }
    }

    async signInWithGoogle() {
        // Sign in with google
        const provider = new GoogleAuthProvider();
        try {
            return await signInWithPopup(this.auth, provider);
        }
        catch (e) {
            throw (e);
        }
    }

    async signOut() {
        // Sign in with google
        try {
            await signOut(this.auth);
        }
        catch (e) {
            throw (e);
        }
    }

    user(): User {
        if (this.app)
            return this.auth.currentUser;
        else
            return null;
    }
}
export type FirebaseUser = User;