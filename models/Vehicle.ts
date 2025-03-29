import mongoose, { Schema, Document } from "mongoose";
import { VehicleSize } from "@/models/VehicleSize"
import ParkingSpot from "@/lib/ParkingSpot";

interface IVehicle extends Document {
    licensePlate: string;
    parkingSpots: [mongoose.Types.ObjectId];
    spotsNeeded: number;
    size: VehicleSize;
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


vehicleSchema.methods.parkInSpot = function (parkingSpot: ParkingSpot) {
    this.parkingSpotsObject.push(parkingSpot);
}

vehicleSchema.methods.clearSpots = function () {
    for (let i = 0; i < this.parkingSpotsObject.length; i++) {
        this.parkingSpotsObject[i].removeVehicle();
    }
    this.parkingSpotsObject = []
}

// abstract canFitInSpots(spot: ParkingSpot): boolean;

export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
