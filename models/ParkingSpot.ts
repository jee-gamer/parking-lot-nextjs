import mongoose from "mongoose";
import {VehicleSize} from "@/models/VehicleSize";
// import Level from "@/lib/Level";
import Vehicle from "@/lib/Vehicle";
import Level from "@/lib/Level"

interface IParkingSpot {
    vehicle: Vehicle;
    spotSize: VehicleSize;
    row: number;
    spotNumber: number;
}

const parkingSpotSchema = new mongoose.Schema<IParkingSpot>({
    vehicle: {
        type: Vehicle,
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
    }
    // Doesn't need level because this will be contained in a level
});

export default parkingSpotSchema
export const parkingSpotModel = mongoose.models.ParkingSpot || mongoose.model("ParkingSpot", parkingSpotSchema);