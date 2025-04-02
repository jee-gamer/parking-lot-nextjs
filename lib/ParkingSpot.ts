import { VehicleSize } from "@/models/VehicleSize";

export default class ParkingSpot {
    spotSize: VehicleSize;
    row: number;
    spotNumber: number;

    constructor(row: number, spotNumber: number, spotSize: VehicleSize) {
        this.row = row;
        this.spotNumber = spotNumber;
        this.spotSize = spotSize;
    }
}