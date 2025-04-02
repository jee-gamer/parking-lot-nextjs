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
    removeVehicle(): void,
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

parkingSpotSchema.methods.removeVehicle = function() {
    this.vehicleObject = null;
}

parkingSpotSchema.methods.isAvailable = function(): boolean {
    return this.vehicleObject == null;
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

    this.vehicle.parkInSpot(this);
    await this.vehicle.save()

    return true;
}

export type TParkingSpot = IParkingSpot & IParkingSpotMethods;
export default parkingSpotSchema