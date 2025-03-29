import VehicleModel from "@/models/Vehicle";
import ParkingSpot from "@/lib/ParkingSpot"
import { VehicleSize } from "@/models/VehicleSize";
import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    spotsNeeded: 5,
    size: VehicleSize.Large,
}, {discriminatorKey: "kind"})

BusSchema.methods.canFitInSpots = function (spot: ParkingSpot): boolean {
    return spot.getSize() == this.size
}

export const Bus = VehicleModel.discriminator("Bus", BusSchema)
