import mongoose, { Schema, Document } from "mongoose";
import {VehicleSize} from "@/models/VehicleSize";

interface IParkingSpot extends Document {
    vehicle: mongoose.Types.ObjectId;
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
    },
});

export default parkingSpotSchema