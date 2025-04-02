import mongoose from "mongoose";
import levelSchema from "@/models/Level";
import Level from "@/lib/Level"
import {TVehicle} from "@/models/Vehicle";
import DatabaseManager from "@/lib/DatabaseManager";

const DB = DatabaseManager.getInstance();

const totalSpots = 40;
const spotsPerRow = 20;
const NUM_LEVELS = 5;

interface IParkingLot {
    levels: Level[];
    NUM_LEVELS: number;
}

const parkingLotSchema = new mongoose.Schema<IParkingLot>({
    levels: [levelSchema],
    NUM_LEVELS: {
        type: Number,
        default: NUM_LEVELS,
    }
})

parkingLotSchema.pre("save", async function (next) {
    this.levels = await Promise.all(
        Array.from({length: this.NUM_LEVELS}, (_, i) =>
            Level.create(i, totalSpots, spotsPerRow)
        )
    );
    next();

});

parkingLotSchema.methods.parkVehicle = async function (vehicle: TVehicle) {
    for (let i=0; i< this.levels.length; i++) {
        await vehicle.populate("parkingSpots")
        await this.populate("levels.spots")
        if (await this.levels[i].parkVehicle(vehicle)) {

            await DB.getConnection()
            await this.save()
            await vehicle.save()
            return true;
        }
    }
    return false;
}

export default mongoose.models.ParkingLot || mongoose.model("ParkingLot", parkingLotSchema);
