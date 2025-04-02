import VehicleModel from "@/models/Vehicle";
import ParkingSpot from "@/lib/ParkingSpot"
import { VehicleSize } from "@/models/VehicleSize";
import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    spotsNeeded: {
        type: Number,
        default: 1
    },
    size: {
        type: String,
        enum: Object.values(VehicleSize),
        default: VehicleSize.Compact
    },
}, {discriminatorKey: "kind"})

CarSchema.methods.canFitInSpots = function (spot: ParkingSpot): boolean {
    return spot.spotSize == this.size
}

export const Car = VehicleModel.discriminator("Car", CarSchema)