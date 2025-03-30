import mongoose, { Schema, Document } from "mongoose";
import { VehicleSize } from "@/models/VehicleSize"
import { VehicleType } from "@/models/VehicleType";
import ParkingSpot from "@/lib/ParkingSpot";
import ParkingSpotSchema from "@/models/ParkingSpot";

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

export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
