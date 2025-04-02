import Vehicle from "@/lib/Vehicle";
import {VehicleSize} from "@/models/VehicleSize";
import mongoose from "mongoose";
import DatabaseManager from "@/lib/DatabaseManager";
import VehicleModel from '@/models/Vehicle';

const DB = DatabaseManager.getInstance();

export default class ParkingSpot {
        private vehicle: mongoose.Types.ObjectId | Vehicle | null = null; // mongo ID for vehicle
        private spotSize: VehicleSize;
        private row: number;
        private spotNumber: number;

    constructor(r: number, n: number, sz: VehicleSize) {
        this.row = r;
        this.spotNumber = n;
        this.spotSize = sz;
    }

    public isAvailable(): boolean {
        return this.vehicleObject == null;
    }

    public canFitVehicle(vehicle: Vehicle): boolean {
        return this.isAvailable() && vehicle.canFitInSpots(this);
    }

    async park(v: Vehicle): Promise<boolean> {
        await DB.getConnection()

        if (!this.canFitVehicle(v)) {
            console.log(`Can't fit vehicle`)
            return false;
        }
        this.vehicleObject = v;
        this.vehicleObject.parkInSpot(this);

        const thisVehicle = await VehicleModel.findOne({ licensePlate: v.getLicensePlate()});
        this.vehicle = thisVehicle._id
        // Don't care about error case for now

        return true;
    }

    public getRow() {
        return this.row;
    }

    public getSize() {
        return this.spotSize;
    }

    public getSpotNumber() {
        return this.spotNumber;
    }

    public getAttributes() {
        return {
            vehicle: this.vehicleObject,
            spotSize: this.spotSize,
            row: this.row,
            spotNumber: this.spotNumber,
        }
    }

    public removeVehicle() {
        this.vehicleObject = null;
    }

    public print() {
        if (this.vehicleObject == null) {
            if (this.spotSize == VehicleSize.Compact) {
                console.log("c");
            } else if (this.spotSize == VehicleSize.Large) {
                console.log('l');
            } else if (this.spotSize == VehicleSize.Motorcycle) {
                console.log('m');
            }
        } else {
            this.vehicleObject.print()
        }
     }
}