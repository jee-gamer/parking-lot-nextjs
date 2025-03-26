import mongoose from "mongoose";
import {VehicleSize} from "@/models/VehicleSize";
// import Level from "@/lib/Level";
import Vehicle from "@/lib/Vehicle";

const parkingSpotSchema = new mongoose.Schema({
    spotNumber: {
        type: Number,
        required: true,
    },
    spotSize: {
        type: String,
        enum: Object.values(VehicleSize),
        required: true,
    },
    vehicle: {
        type: Vehicle,
        default: null,
    },
    row: {
        type: Number,
        required: true,
    }
    // Doesn't need level because this will be contained in a level
});

export default parkingSpotSchema
export const parkingSpotModel = mongoose.models.ParkingSpot || mongoose.model("ParkingSpot", parkingSpotSchema);