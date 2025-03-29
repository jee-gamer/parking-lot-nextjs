import { VehicleSize } from "@/models/VehicleSize"
import ParkingSpot from "@/lib/ParkingSpot";
import mongoose, { Document } from "mongoose";

export default abstract class Vehicle extends Document {
    parkingSpots: Array<mongoose.Types.ObjectId> | null = null // reference by Id
    protected licensePlate: string;
    protected spotsNeeded: number;
    protected size: VehicleSize;
    protected parkingSpotsObject: ParkingSpot[];

    protected constructor(licensePlate: string, spotsNeeded: number, vehicleSize: VehicleSize) {
        super();
        this.licensePlate = licensePlate;
        this.parkingSpotsObject = new Array<ParkingSpot>();
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

    parkInSpot(parkingSpot: ParkingSpot) {
        this.parkingSpotsObject.push(parkingSpot);
    }

    clearSpots() {
        for (let i = 0; i < this.parkingSpotsObject.length; i++) {
            this.parkingSpotsObject[i].removeVehicle();
        }
        this.parkingSpotsObject = []
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