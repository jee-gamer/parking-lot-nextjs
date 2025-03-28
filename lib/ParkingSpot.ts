import Vehicle from "@/lib/Vehicle";
import {VehicleSize} from "@/models/VehicleSize";
import Level from "./Level";
import DatabaseManager from "@/lib/DatabaseManager"
import VehicleModel from "@/models/Vehicle";
import {VehicleType} from "@/models/VehicleType";
import { ParkingSpotModel } from "@/models/ParkingSpot";

const DB = DatabaseManager.getInstance();

export default class ParkingSpot {
        private vehicle: Vehicle | null = null;
        private spotSize: VehicleSize;
        private row: number;
        private spotNumber: number;
        private level: Level;
        private thismodel: number // maybe put model here

    constructor(lvl: Level, r: number, n: number, sz: VehicleSize) {
            // maybe change the arguments to model so you can create class from model you get from
        this.level = lvl;
        this.row = r;
        this.spotNumber = n;
        this.spotSize = sz;
    }

    public isAvailable(): boolean {
        return this.vehicle == null;
    }

    public canFitVehicle(vehicle: Vehicle): boolean {
        return this.isAvailable() && vehicle.canFitInSpots(this);
    }

    async park(v: Vehicle): Promise<boolean> {
        if (!this.canFitVehicle(v)) {
            return false;
        }
        this.vehicle = v;
        this.vehicle.parkInSpot(this);


        // SAVE TO MODEL
        const parkingSpot = await ParkingSpotModel.findOne({ licensePlate }).lean();

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

    public removeVehicle() {
        // API
        this.vehicle = null;
    }

    public print() {
        if (this.vehicle == null) {
            if (this.spotSize == VehicleSize.Compact) {
                console.log("c");
            } else if (this.spotSize == VehicleSize.Large) {
                console.log('l');
            } else if (this.spotSize == VehicleSize.Motorcycle) {
                console.log('m');
            }
        } else {
            this.vehicle.print()
        }
     }
}