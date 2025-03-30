import Vehicle from "@/lib/Vehicle";
import {VehicleSize} from "@/models/VehicleSize";
import mongoose, {Document} from "mongoose";
import DatabaseManager from "@/lib/DatabaseManager";
import VehicleModel from '@/models/Vehicle';

const DB = DatabaseManager.getInstance();

export default class ParkingSpot extends Document {
        private vehicle: mongoose.Types.ObjectId | null = null; // mongo ID for vehicle
        private spotSize: VehicleSize;
        private row: number;
        private spotNumber: number;

    constructor(r: number, n: number, sz: VehicleSize) {
        super();
        this.row = r;
        this.spotNumber = n;
        this.spotSize = sz;
    }

    async isAvailable(): Promise<boolean> {
        await this.populate("vehicle"); // if no id nothing happens
        return this.vehicle == null;
    }

    async canFitVehicle(vehicle: Vehicle): Promise<boolean> {
        return await this.isAvailable() && vehicle.canFitInSpots(this);
    }

    async park(vehicle: Vehicle): Promise<boolean> {
        await DB.getConnection()

        const canFit = await this.canFitVehicle(vehicle);
        if (!canFit) {
            console.log(`Can't fit vehicle`)
            return false;
        }

        vehicle.parkInSpot(this);
        this.vehicle = vehicle._id as mongoose.Types.ObjectId;

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
            vehicle: this.vehicle,
            spotSize: this.spotSize,
            row: this.row,
            spotNumber: this.spotNumber,
        }
    }

    public removeVehicle() {
        this.vehicle = null;
    }
}