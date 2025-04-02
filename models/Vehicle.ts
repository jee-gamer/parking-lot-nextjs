import mongoose, { Schema, Document } from "mongoose";
import { VehicleSize } from "@/models/VehicleSize"
import { TParkingSpot } from "@/models/ParkingSpot";


interface IVehicle extends Document {
    licensePlate: string;
    parkingSpots: [mongoose.Types.ObjectId];
    spotsNeeded: number;
    size: VehicleSize;
}

export interface IVehicleMethods {
    parkInSpot(spot: TParkingSpot): void;
    clearSpots(): Promise<void>;
    canFitInSpots(parkingSpot: TParkingSpot): boolean;
}

const vehicleSchema = new mongoose.Schema<IVehicle>({
    licensePlate: {
        type: String,
        required: true,
        unique: true,
    },
    parkingSpots: [{
        type: Schema.Types.ObjectId,
        ref: "ParkingSpot"
    }],
    spotsNeeded: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        enum: Object.values(VehicleSize),
        required: true,
    },
});


vehicleSchema.methods.parkInSpot = async function (parkingSpot: TParkingSpot) {
    this.parkingSpots.push(parkingSpot);
}

vehicleSchema.methods.clearSpots = async function () {
    for (let i = 0; i < this.parkingSpots.length; i++) {
        this.parkingSpots[i].removeVehicle();
    }
    this.parkingSpots = []
    return true
}

// abstract canFitInSpots(spot: ParkingSpot): boolean;

export type TVehicle = IVehicle & IVehicleMethods
export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
