import Level from "@/lib/Level"
import Vehicle from "@/lib/Vehicle";
import DatabaseManager from "@/lib/DatabaseManager";
import mongoose, { Document } from "mongoose";

const DB = DatabaseManager.getInstance()

export default class ParkingLot extends Document {
    public id: mongoose.Types.ObjectId | null = null; // mirror from mongoose
    private levels: Level[];
    private NUM_LEVELS: number = 5;

    constructor() {
        super();
        this.levels = Array.from({ length: this.NUM_LEVELS }, (_, i) => new Level(i, 10)); // 10 spots per level for now
    }

    async parkVehicle(vehicle: Vehicle) {
        for (let i=0; i< this.levels.length; i++) {
            if (this.levels[i].parkVehicle(vehicle)) {

                await DB.getConnection()
                await DB.saveParkingLot(this)
                await DB.saveVehicle(vehicle)
                return true;
            }
        }
        return false;
    }

    public getAttributes() {
        return {
            id: this.id,
            levels: this.levels, // Don't know if this is correct, levels can be modified then, but I dont know if making copies is viable
            NUM_LEVELS: this.NUM_LEVELS,
        }
    }
}