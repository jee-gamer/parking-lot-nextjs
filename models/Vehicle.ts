import mongoose from "mongoose";
import { VehicleSize } from "@/models/VehicleSize"
// import ParkingSpot from "@/models/ParkingSpot";

const vehicleSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    spotsNeeded: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        enum: Object.values(VehicleSize),
        required: true,
    },
    parked: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
