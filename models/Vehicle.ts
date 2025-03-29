import mongoose, { Schema, Document } from "mongoose";
import { VehicleSize } from "@/models/VehicleSize"
import ParkingSpot from "@/lib/ParkingSpot";
import { TParkingSpot } from "@/models/ParkingSpot";

interface IVehicle extends Document {
    licensePlate: string;
    parkingSpots: [mongoose.Types.ObjectId];
    spotsNeeded: number;
    size: VehicleSize;
}

export interface IVehicleMethods {
    parkInSpot(spot: TParkingSpot): void;
    clearSpots(): void;
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


vehicleSchema.methods.parkInSpot = function (parkingSpot: TParkingSpot) {
    this.parkingSpotsObject.push(parkingSpot);
}

vehicleSchema.methods.clearSpots = function () {
    for (let i = 0; i < this.parkingSpotsObject.length; i++) {
        this.parkingSpotsObject[i].removeVehicle();
    }
    this.parkingSpotsObject = []
}

// abstract canFitInSpots(spot: ParkingSpot): boolean;

export type TVehicle = IVehicle & IVehicleMethods
export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
