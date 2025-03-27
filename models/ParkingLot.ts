import mongoose from "mongoose";
import levelSchema from "@/models/Level";
import Level from "@/lib/Level"

interface IParkingLot {
    levels: Level[];
    NUM_LEVELS: number;
}

const parkingLotSchema = new mongoose.Schema<IParkingLot>({
    levels: [levelSchema],
    NUM_LEVELS: {
        type: Number,
        required: true,
    },
})

export default mongoose.models.ParkingLot || mongoose.model("ParkingLot", parkingLotSchema);
