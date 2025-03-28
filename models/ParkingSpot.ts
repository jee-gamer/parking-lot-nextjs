import mongoose, { Schema, Document } from "mongoose";
import {VehicleSize} from "@/models/VehicleSize";
// import Level from "@/lib/Level";
import Vehicle from "@/lib/Vehicle";
import Level from "@/lib/Level"

interface IParkingSpot extends Document {
    vehicle: moonge.Types.ObjectId;
    spotSize: VehicleSize;
    row: number;
    spotNumber: number;
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
    }
    // Doesn't need level because this will be contained in a level
});

export default parkingSpotSchema
export const ParkingSpotModel = mongoose.models.ParkingSpot || mongoose.model("ParkingSpot", parkingSpotSchema);