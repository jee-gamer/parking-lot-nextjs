import { VehicleSize } from "@/models/VehicleSize"
import ParkingSpot from "@/lib/ParkingSpot";
import mongoose from "mongoose";
import VehicleModel from "@/models/Vehicle"
import { VehicleType } from "@/models/VehicleType"

export default abstract class Vehicle {
    private _id: any
    parkingSpots: Array<mongoose.Types.ObjectId> | ParkingSpot[]; // reference by Id
    protected licensePlate: string;
    protected spotsNeeded: number;
    protected size: VehicleSize;

    protected constructor(licensePlate: string, spotsNeeded: number, vehicleSize: VehicleSize, vehicleType: VehicleType, create?: boolean) {
        this.licensePlate = licensePlate;
        this.parkingSpots = new Array<ParkingSpot>();
        this.spotsNeeded = spotsNeeded;
        this.size = vehicleSize;

        if (create) {
            const vehicleDoc = new VehicleModel({
                licensePlate: this.licensePlate,
                spotsNeeded: this.spotsNeeded,
                size: this.size,
                vehicleType: vehicleType,
            })
            vehicleDoc.save();
            this._id = vehicleDoc._id;
        }
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
        // @ts-ignore
        this.parkingSpots.push(parkingSpot);
    }

    clearSpots() {
        for (let i = 0; i < this.parkingSpots.length; i++) {
            // @ts-ignore
            this.parkingSpots[i].removeVehicle();
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