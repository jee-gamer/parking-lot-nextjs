import mongoose from "mongoose";
import { VehicleSize } from "@/models/VehicleSize"
import { VehicleType } from "@/models/VehicleType";

const vehicleSchema = new mongoose.Schema({
    licensePlate: {
        type: String,
        required: true,
    },
    vehicleType: {
        type: String,
        enum: Object.values(VehicleType),
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
