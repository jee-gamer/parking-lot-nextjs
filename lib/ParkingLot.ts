import Level from "@/lib/Level"
import Vehicle from "@/lib/Vehicle";
import DatabaseManager from "@/lib/DatabaseManager";
import mongoose from "mongoose";

const DB = DatabaseManager.getInstance()

export default class ParkingLot {
    public id: mongoose.Types.ObjectId | null = null; // mirror from mongoose
    private levels: Level[];
    private NUM_LEVELS: number = 5;

    constructor() {
        this.levels = Array.from({length: this.NUM_LEVELS}, (_, i) => new Level(i, 10)); // 10 spots per level for now
    }
}