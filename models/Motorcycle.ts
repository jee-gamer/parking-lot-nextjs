import VehicleModel from "@/models/Vehicle";
import ParkingSpot from "@/lib/ParkingSpot"
import { VehicleSize } from "@/models/VehicleSize";
import mongoose from "mongoose";

const MotorcycleSchema = new mongoose.Schema({
    spotsNeeded: {
        type: Number,
        default: 1
    },
    size: {
        type: String,
        enum: Object.values(VehicleSize),
        default: VehicleSize.Motorcycle
    },
}, {discriminatorKey: "kind"})

MotorcycleSchema.methods.canFitInSpots = function (_spot: ParkingSpot): boolean {
    return true
}

export const Motorcycle = VehicleModel.discriminator("Motorcycle", MotorcycleSchema)