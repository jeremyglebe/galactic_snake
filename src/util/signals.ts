/**
 * Singleton emitter used for communication between scenes and classes
 */
export class SignalManager extends Phaser.Events.EventEmitter {

    private constructor() {
        super();
    }

    /**
     * @returns the single instance of the SignalManager, shared globally
     */
    static get() {
        //if an instance has not been made yet, create one
        if (instance == null) {
            instance = new SignalManager;
        }
        //as long as we have an instance, return it
        return instance;
    }
}

/**
 * The instance of the singleton class. (SignalManager) Module level variable
 * and cannot be seen by other scripts.
 */
let instance: SignalManager = null;