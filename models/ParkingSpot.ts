import mongoose, { Schema, Document } from "mongoose";
import {VehicleSize} from "@/models/VehicleSize";
import { TVehicle } from "@/models/Vehicle"
import DatabaseManager from "@/lib/DatabaseManager";

const DB = DatabaseManager.getInstance();

interface IParkingSpot extends Document {
    vehicle: mongoose.Types.ObjectId;
    spotSize: VehicleSize;
    row: number;
    spotNumber: number;
}

interface IParkingSpotMethods {
    removeVehicle(): Promise<void>,
    isAvailable(): boolean,
    canFitVehicle(vehicle: TVehicle): boolean,
    park(vehicle: TVehicle): boolean,
}

const parkingSpotSchema = new mongoose.Schema<IParkingSpot>({
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: "Vehicle",
        default: null,
    },
    spotSize: {
        type: String,
        enum: Object.values(VehicleSize),
        required: true,
    },
    row: {
        type: Number,
        required: true,
    },
    spotNumber: {
        type: Number,
        required: true,
    },
});

parkingSpotSchema.methods.removeVehicle = async function() {
    this.vehicle = null;
    await this.save()
}

parkingSpotSchema.methods.isAvailable = function(): boolean {
    return this.vehicle == null;
}

parkingSpotSchema.methods.canFitVehicle = function(
    this: TParkingSpot, vehicle: TVehicle
): boolean {
    return this.isAvailable() && vehicle.canFitInSpots(this);
}

parkingSpotSchema.methods.park = async function(vehicle: TVehicle): Promise<boolean> {
    await DB.getConnection()

    if (!this.canFitVehicle(vehicle)) {
    console.log(`Can't fit vehicle`)
    return false;
    }

    this.vehicle = vehicle;
    this.vehicle.parkInSpot(this);
    await this.save() // Save here because it does not automatically save when I save parkingLot

    return true;
}

export type TParkingSpot = IParkingSpot & IParkingSpotMethods;
export { parkingSpotSchema }
const ParkingSpot = mongoose.models.ParkingSpot || mongoose.model("ParkingSpot", parkingSpotSchema);
export default ParkingSpot
