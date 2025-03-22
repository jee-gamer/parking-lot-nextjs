import dbConnect from './mongodb'

export default class DatabaseManager {
    private static instance: DatabaseManager;
    private static connection;

    private constructor() {
        // do nothing
    }

    static getInstance() {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
            DatabaseManager.connection = null; // no connection at first
        }
        return DatabaseManager.instance;
    }

    async getConnection() {
        if (!this.getConnection) {
            DatabaseManager.connection = await dbConnect();
        }
    }

    saveData() {

    }
}