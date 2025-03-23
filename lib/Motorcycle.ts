import Vehicle from "../lib/Vehicle";
import ParkingSpot from "@/lib/ParkingSpot"
import { VehicleSize } from "@/models/VehicleSize";

export default class Motorcycle extends Vehicle {

    constructor(licensePlate: string) {
        let SpotNeeded = 1
        let size = VehicleSize.Motorcycle
        super(licensePlate, SpotNeeded, size);
    }

    public canFitInSpots(spot: ParkingSpot): boolean {
        return true;
    }

    print(){
        console.log("M")
    }
}