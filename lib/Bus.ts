import Vehicle from "../lib/Vehicle";
import ParkingSpot from "@/lib/ParkingSpot"
import { VehicleSize } from "@/models/VehicleSize";

export default class Bus extends Vehicle {

    constructor(licensePlate: string) {
        let SpotNeeded = 5
        let size = VehicleSize.Large
        super(licensePlate, SpotNeeded, size);
    }

    public canFitInSpots(spot: ParkingSpot): boolean {
        return spot.getSize() == this.size
    }

    print(){
        console.log("B")
    }
}