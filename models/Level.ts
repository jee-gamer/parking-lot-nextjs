import mongoose from "mongoose";
import parkingSpotSchema from "@/models/ParkingSpot"

const levelSchema = new mongoose.Schema({
    floor: {
        type: Number,
        required: true,
    },
    spots: [parkingSpotSchema],
})

export default levelSchema;