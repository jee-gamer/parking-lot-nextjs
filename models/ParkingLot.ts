import mongoose, {Document, Model} from "mongoose";
import levelSchema from "@/models/Level";
import Level from "@/lib/Level"
import {TVehicle} from "@/models/Vehicle";
import DatabaseManager from "@/lib/DatabaseManager";

const DB = DatabaseManager.getInstance();

const totalSpots = 40;
const spotsPerRow = 20;
const NUM_LEVELS = 1;

interface IParkingLot extends Document {
    levels: Level[];
    NUM_LEVELS: number;
}

interface IParkingLotMethods {
    parkVehicle(vehicle: TVehicle): Promise<boolean>
}

export type ParkingLotDoc = Document & IParkingLot & IParkingLotMethods

interface IParkingLotModel extends Model<ParkingLotDoc> {
    getOrCreate(): Promise<ParkingLotDoc>;
}

const parkingLotSchema = new mongoose.Schema<ParkingLotDoc, IParkingLotModel>({
    levels: [levelSchema],
    NUM_LEVELS: {
        type: Number,
        default: NUM_LEVELS,
    }
})

parkingLotSchema.statics.getOrCreate = async function () {
    const ParkingLot = mongoose.model("ParkingLot");
    const exist = await ParkingLot.findOne({})
    if (exist) {
        return exist;
    }

    const parkingLot = new this();
    // @ts-ignore
    parkingLot.levels = await Promise.all(
        Array.from({length: NUM_LEVELS}, (_, i) =>
            Level.create(i, totalSpots, spotsPerRow) // Use create function because constructor cannot be async
        )
    );
    await parkingLot.save();
    return parkingLot;
}

parkingLotSchema.methods.parkVehicle = async function (vehicle: TVehicle) {
    for (let i=0; i< this.levels.length; i++) {
        await vehicle.populate("parkingSpots")
        await this.populate("levels.spots")

        if (await this.levels[i].parkVehicle(vehicle)) {

            await DB.getConnection()
            return true;
        }
    }
    return false;
}

export default mongoose.models.ParkingLot as IParkingLotModel || mongoose.model<ParkingLotDoc, IParkingLotModel>("ParkingLot", parkingLotSchema);
