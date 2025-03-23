import ParkingSpot from "@/lib/ParkingSpot";
import {VehicleSize} from "@/models/VehicleSize";
import Vehicle from "@/lib/Vehicle";

export default class Level {
    private floor: number;
    private spots: ParkingSpot[];
    private availableSpotsLocal: number = 0; // number of free spots
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
            this.spots[i] = new ParkingSpot(this, row, i, sz);
        }

        this.availableSpotsLocal = numberSpots;
    }

    public availableSpots(): number {
        return this.availableSpotsLocal;
    }

    public parkVehicle(vehicle: Vehicle) {
        if (this.availableSpotsLocal < vehicle.getSpotsNeeded()) {
            return false;
        }
        let spotNumber: number =  this.findAvailableSpots(vehicle);
        if (spotNumber < 0) {
            return false;
        }
        return this.parkStartingAtSpot(spotNumber, vehicle);
    }

    private parkStartingAtSpot(spotNumber: number, vehicle: Vehicle) {
        vehicle.clearSpots();
        let success: boolean = true;
        for (let i = spotNumber; i < spotNumber + vehicle.spotsNeeded; i++) {
            success &&= this.spots[i].park(vehicle);
        }
        this.availableSpotsLocal -= vehicle.spotsNeeded;
        return success;
    }

    private findAvailableSpots(vehicle: Vehicle) {
        let spotsNeeded: number = vehicle.getSpotsNeeded();
        let lastRow: number = -1;
        let spotsFound: number = 0;

        for (let i=0; i<this.spots.length; i++) {
            let spot: ParkingSpot = this.spots[i];
            if (lastRow != spot.getRow()) { // if found the spot that's not the same row then it can't be used anymore so reset spot count and consider the row you just see.
                spotsFound = 0;
                lastRow = spot.getRow();
            }
            if (spot.canFitVehicle(vehicle)) {
                spotsFound++;
            } else {
                spotsFound = 0;
            }
            if (spotsFound == spotsNeeded) {
                return i - (spotsNeeded - 1);
            }
        }
    }

    public print() {
        let lastRow: number = -1;
        for (let i=0; i<this.spots.length; i++) {
            let spot: ParkingSpot = this.spots[i];
            if (spot.getRow() != lastRow) {
                console.log("  ");
                lastRow = spot.getRow();
            }
            spot.print();
        }
    }

    public spotFreed() {
        this.availableSpotsLocal++;
    }
}