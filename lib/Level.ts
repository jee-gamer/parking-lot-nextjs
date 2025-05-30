import ParkingSpot from "@/lib/ParkingSpot";
import {VehicleSize} from "@/models/VehicleSize";
import Vehicle from "@/lib/Vehicle";
import mongoose, { Document } from "mongoose";

export default class Level extends Document {
    private floor: number;
    private spots: ParkingSpot[];
    private availableSpots: number = 0; // number of free spots
    private static readonly SPOTS_PER_ROW: number = 10;

    constructor(flr: number, numberSpots: number) {
        super();
        this.floor = flr;
        this.spots = new Array(numberSpots);

        let largeSpots = Math.floor(numberSpots / 4);
        let bikeSpots = Math.floor(numberSpots / 4);
        let compactSpots = numberSpots - largeSpots - bikeSpots;

        for (let i = 0; i < numberSpots; i++) {
            let sz: VehicleSize = VehicleSize.Motorcycle;

            if (i < largeSpots) {
                sz = VehicleSize.Large;
            } else if (i < largeSpots + compactSpots) {
                sz = VehicleSize.Compact;
            }

            let row = Math.floor(i / Level.SPOTS_PER_ROW);
            this.spots[i] = new ParkingSpot(row, i, sz);
        }

        this.availableSpots = numberSpots;
    }

    public getAvailableSpots(): number {
        return this.availableSpots;
    }

    async parkVehicle(vehicle: Vehicle) {
        if (this.availableSpots < vehicle.getSpotsNeeded()) {
            console.log("Not enough available spots")
            return false;
        }
        let spotNumber: number =  await this.findAvailableSpots(vehicle);
        if (spotNumber < 0) {
            console.log("Not enough available spots after check")
            return false;
        }
        return this.parkStartingAtSpot(spotNumber, vehicle);
    }

    async parkStartingAtSpot(spotNumber: number, vehicle: Vehicle) {
        await vehicle.clearSpots();
        let success: boolean = true;
        for (let i = spotNumber; i < spotNumber + vehicle.getSpotsNeeded(); i++) {
            const result = await this.spots[i].park(vehicle);
            success &&= result
        }
        this.availableSpots -= vehicle.getSpotsNeeded();
        console.log(`${success} at parking at the spot`);
        return success;
    }

    async findAvailableSpots(vehicle: Vehicle): Promise<number> {
        // API
        let spotsNeeded: number = vehicle.getSpotsNeeded();
        let lastRow: number = -1;
        let spotsFound: number = 0;

        for (let i=0; i<this.spots.length; i++) {
            let spot: ParkingSpot = this.spots[i];
            if (lastRow != spot.getRow()) { // if found the spot that's not the same row then it can't be used anymore so reset spot count and consider the row you just see.
                spotsFound = 0;
                lastRow = spot.getRow();
            }
            if (await spot.canFitVehicle(vehicle)) {
                spotsFound++;
            } else {
                spotsFound = 0;
            }
            if (spotsFound == spotsNeeded) {
                return i - (spotsNeeded - 1);
            }
        }
        return -1;
    }

    public spotFreed() {
        this.availableSpots++;
    }
}