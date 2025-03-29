import VehicleModel from "@/models/Vehicle";
import ParkingSpot from "@/lib/ParkingSpot"
import { VehicleSize } from "@/models/VehicleSize";
import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    spotsNeeded: 1,
    size: VehicleSize.Compact,
}, {discriminatorKey: "kind"})

CarSchema.methods.canFitInSpots = function (spot: ParkingSpot): boolean {
    return spot.getSize() == this.size
}

export const Car = VehicleModel.discriminator("Car", CarSchema)