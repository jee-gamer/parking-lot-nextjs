import mongoose from "mongoose";
import parkingSpotSchema from "@/models/ParkingSpot"
import ParkingSpot from "@/lib/ParkingSpot"

interface ILevel {
    floor: number;
    spots: ParkingSpot[];
    availableSpots: number;
    SPOTS_PER_ROW: number;
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

export default levelSchema;