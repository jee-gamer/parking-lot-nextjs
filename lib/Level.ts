import {VehicleSize} from "@/models/VehicleSize";
import ParkingSpot from "@/lib/ParkingSpot";

export default class Level {
    private floor: number;
    private spots: ParkingSpot[];
    private availableSpots: number = 0; // number of free spots
    private static readonly SPOTS_PER_ROW: number = 10;

    constructor(flr: number, numberSpots: number) {
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
}