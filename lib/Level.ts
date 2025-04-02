import {VehicleSize} from "@/models/VehicleSize";
import ParkingSpot from "@/models/ParkingSpot";
import mongoose from "mongoose";

export default class Level {
    private floor: number | undefined;
    private spots: mongoose.Types.ObjectId[] | undefined;
    private availableSpots: number = 0; // number of free spots

    constructor(flr: number, spots: mongoose.Types.ObjectId[], availableSpots: number) {
        this.floor = flr;
        this.spots = spots
        this.availableSpots = availableSpots;
    }

    static async create(flr: number, numberSpots: number, spots_per_row: number) {
        const spots = new Array<mongoose.Types.ObjectId>;

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

            let row = Math.floor(i / spots_per_row);
            spots[i] = await ParkingSpot.create({
                spotSize: sz,
                row: row,
                spotNumber: i
            })
        }

        return new Level(flr, spots, numberSpots);
    }
}