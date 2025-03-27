import mongoose from "mongoose";
import { VehicleSize } from "@/models/VehicleSize"
import { VehicleType } from "@/models/VehicleType";
import ParkingSpot from "@/lib/ParkingSpot";
import ParkingSpotSchema from "@/models/ParkingSpot";

interface IVehicle {
    parkingSpots: [ParkingSpot];
    licensePlate: string;
    spotsNeeded: number;
    size: VehicleSize;
    vehicleType: VehicleType; // added because all vehicle is in this class
}

const vehicleSchema = new mongoose.Schema<IVehicle>({
    parkingSpots: [ParkingSpotSchema],
    licensePlate: {
        type: String,
        required: true,
    },
    spotsNeeded: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        enum: Object.values(VehicleSize),
        required: true,
    },
    vehicleType: {
        type: String,
        enum: Object.values(VehicleType),
        required: true,
    },
});

export default mongoose.models.Vehicle || mongoose.model('Vehicle', vehicleSchema);
