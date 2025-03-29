import VehicleModel from "@/models/Vehicle";
import ParkingSpot from "@/lib/ParkingSpot"
import { VehicleSize } from "@/models/VehicleSize";
import mongoose from "mongoose";

const MotorcycleSchema = new mongoose.Schema({
    spotsNeeded: 1,
    size: VehicleSize.Motorcycle,
}, {discriminatorKey: "kind"})

MotorcycleSchema.methods.canFitInSpots = function (spot: ParkingSpot): boolean {
    return true
}

export const Motorcycle = VehicleModel.discriminator("Motorcycle", MotorcycleSchema)