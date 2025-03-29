import mongoose from "mongoose";
import parkingSpotSchema from "@/models/ParkingSpot"
import ParkingSpot from "@/lib/ParkingSpot"
import Vehicle, {TVehicle} from "@/models/Vehicle";

interface ILevel {
    floor: number;
    spots: ParkingSpot[];
    availableSpots: number;
    SPOTS_PER_ROW: number;
}

interface ILevelMethods {
    parkVehicle(vehicle: TVehicle): boolean,
    parkStartingAtSpot(spotNumber: number, vehicle: TVehicle): boolean,
    findAvailableSpots(vehicle: TVehicle): number
    spotFreed(): void
}

const levelSchema = new mongoose.Schema<ILevel>({
    floor: {
        type: Number,
        required: true,
    },
    spots: [parkingSpotSchema],
    availableSpots: {
        type: Number,
        required: true,
    },
    SPOTS_PER_ROW: {
        type: Number,
        default: 10,
    }
})

export type TLevel = ILevel & ILevelMethods;
export default levelSchema;