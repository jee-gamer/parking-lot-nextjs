import Vehicle from "@/lib/Vehicle";
import {VehicleSize} from "@/models/VehicleSize";
import Level from "./Level";
import DatabaseManager from "@/lib/DatabaseManager"

const DB = DatabaseManager.getInstance();

export default class ParkingSpot {
        private vehicle: Vehicle | null = null;
        private spotSize: VehicleSize;
        private row: number;
        private spotNumber: number;
        private level: Level;

    constructor(lvl: Level, r: number, n: number, sz: VehicleSize) {
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
            level: this.level,
        }
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