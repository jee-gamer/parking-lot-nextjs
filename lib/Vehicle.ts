import { VehicleSize } from "@/models/VehicleSize"
import ParkingSpot from "@/lib/ParkingSpot";
import mongoose, { Document } from "mongoose";

export default abstract class Vehicle extends Document {
    parkingSpots: Array<mongoose.Types.ObjectId> // reference by Id
    protected licensePlate: string;
    protected spotsNeeded: number;
    protected size: VehicleSize;

    protected constructor(licensePlate: string, spotsNeeded: number, vehicleSize: VehicleSize) {
        super();
        this.licensePlate = licensePlate;
        this.parkingSpots = []
        this.spotsNeeded = spotsNeeded;
        this.size = vehicleSize;
    }

    getSpotsNeeded() {
        return this.spotsNeeded;
    }

    getSize() {
        return this.size;
    }

    getLicensePlate() {
        return this.licensePlate;
    }

    parkInSpot(spot: ParkingSpot) {
        this.parkingSpots.push(spot._id as mongoose.Types.ObjectId);
    }

    async clearSpots() {
        await this.populate("parkingSpots");
        const populatedSpots = this.parkingSpots as unknown as ParkingSpot[];
        for (let i = 0; i < this.parkingSpots.length; i++) {
            populatedSpots[i].removeVehicle();
        }
        this.parkingSpots = []
    }

    getAttributes() {
        return {
            licensePlate: this.licensePlate,
            parkingSpots: this.parkingSpots,
            spotsNeeded: this.spotsNeeded,
            size: this.size,
            vehicleType: this.constructor.name,
        }
    }

    abstract canFitInSpots(spot: ParkingSpot): boolean;
    abstract print(): void;

}