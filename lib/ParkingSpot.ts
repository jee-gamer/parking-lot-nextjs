import Vehicle from "@/lib/Vehicle";
import {VehicleSize} from "@/models/VehicleSize";
import Level from "./Level";
import axios from 'axios';

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
        // Call Api to park!
        if (!this.canFitVehicle(v)) {
            return false;
        }
        this.vehicle = v;
        this.vehicle.parkInSpot(this); // may need to be removed?

        // const response = await axios.post(`${process.env.API_BASE_URL}/vehicleMethod`, { this: ParkingSpot });
        // if (response.status !== 200) {
        //     // can't park for some reason
        //     console.error(response);
        //     return false;
        // }

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