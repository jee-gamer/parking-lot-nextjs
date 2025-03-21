import Vehicle from "@/models/Vehicle";
import {VehicleSize} from "@/models/VehicleSize";
import Level from "../models/Level";

export default class ParkingSpot {
    private vehicle: Vehicle;
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

    public park(v: Vehicle): boolean {
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

    public removeVehicle() {
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