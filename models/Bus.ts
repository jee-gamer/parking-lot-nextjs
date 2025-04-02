import VehicleModel from "@/models/Vehicle";
import ParkingSpot from "@/lib/ParkingSpot"
import { VehicleSize } from "@/models/VehicleSize";
import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    spotsNeeded: {
        type: Number,
        default: 5
    },
    size: {
        type: String,
        enum: Object.values(VehicleSize),
        default: VehicleSize.Large
    },
}, {discriminatorKey: "kind"})

BusSchema.methods.canFitInSpots = function (spot: ParkingSpot): boolean {
    return spot.spotSize == this.size
}

export const Bus = VehicleModel.discriminator("Bus", BusSchema)
