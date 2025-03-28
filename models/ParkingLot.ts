import mongoose, {Schema} from "mongoose";
import levelSchema from "@/models/Level";
import Level from "@/lib/Level"

interface IParkingLot {
    _id: mongoose.Types.ObjectId;
    levels: Level[];
    NUM_LEVELS: number;
}

const parkingLotSchema = new mongoose.Schema<IParkingLot>({
    _id: {
        type: Schema.Types.ObjectId,
    },
    levels: [levelSchema],
    NUM_LEVELS: {
        type: Number,
        required: true,
    },
})

export default mongoose.models.ParkingLot || mongoose.model("ParkingLot", parkingLotSchema);
