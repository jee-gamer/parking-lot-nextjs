import Vehicle from "@/models/Vehicle";
import {VehicleSize} from "@/models/VehicleSize";

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
        return this.isAvailable() && this.vehicle.canFitInSpots(this);
    }

    public park(v: Vehicle): boolean {
        if (!this.canFitVehicle(v)) {
            return false;
        }
        this.vehicle = v;
        this.vehicle.parkInSpot(this);
        return true;
    }
}