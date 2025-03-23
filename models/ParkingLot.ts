import mongoose from "mongoose";
import levelSchema from "@/models/Level";

const parkingLotSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    levels: [levelSchema],

})

export default mongoose.models.ParkingLot || mongoose.model("ParkingLot", parkingLotSchema);
