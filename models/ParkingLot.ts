import mongoose from "mongoose";
import levelSchema from "@/models/Level";
import Level from "@/lib/Level"
import { TVehicle } from "@/models/Vehicle";
import DatabaseManager from "@/lib/DatabaseManager";

const DB = DatabaseManager.getInstance();

const spots = 10;
const NUM_LEVELS = 5;

interface IParkingLot {
    levels: Level[];
    NUM_LEVELS: number;
}

const parkingLotSchema = new mongoose.Schema<IParkingLot>({
    levels: [levelSchema],
    NUM_LEVELS: NUM_LEVELS,
})

parkingLotSchema.pre("init", function (next) {
    this.levels = Array.from({length: this.NUM_LEVELS}, (_, i) => new Level(i, spots));
    next();
});

parkingLotSchema.methods.parkVehicle = async function (vehicle: TVehicle) {
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

export default mongoose.models.ParkingLot || mongoose.model("ParkingLot", parkingLotSchema);
