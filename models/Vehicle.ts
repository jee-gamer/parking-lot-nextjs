import mongoose from "mongoose";
import { VehicleSize } from "@/models/VehicleSize"
import ParkingSpot from "";

export default abstract class Vehicle {
    parkingSpots: Array<ParkingSpot> = new Array<ParkingSpot>();
    licensePlate: string;
    spotsNeeded: number;
    size: VehicleSize;

    constructor() {
        this.parkingSpots = [];
    }

    getSpotsNeeded() {
        return this.spotsNeeded;
    }

    getSize() {
        return this.size;
    }

    parkInSpot(parkingSpot: ParkingSpot) {
        this.parkingSpots.push(ParkingSpot);
    }

    clearSpots() {
        for (let i = 0; i <= this.parkingSpots.length; i++) {
            this.parkingSpots.get(i).removeVehicle();
        }
        this.parkingSpots = []
    }

    abstract canFitInSpots(spot: ParkingSpot): boolean;
    abstract print(): void;

}

const B = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
});

// export default mongoose.models.Item || mongoose.model('Item', ItemSchema);