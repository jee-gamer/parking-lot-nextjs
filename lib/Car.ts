import Vehicle from "../lib/Vehicle";
import ParkingSpot from "@/lib/ParkingSpot"
import { VehicleSize } from "@/models/VehicleSize";

export default class Car extends Vehicle {

    constructor(licensePlate: string) {
        let SpotNeeded = 1
        let size = VehicleSize.Compact
        super(licensePlate, SpotNeeded, size);
    }

    public canFitInSpots(spot: ParkingSpot): boolean {
        return spot.getSize() == this.size
    }

    print(){
        console.log("C")
    }
}