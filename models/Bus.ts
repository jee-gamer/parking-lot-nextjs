import Vehicle from "../models/Vehicle";
import ParkingSpot from "@/models/ParkingSpot"
import { VehicleSize } from "@/models/VehicleSize";
import mongoose from "mongoose";

export default class Bus extends Vehicle {
    spotsNeeded = 5
    size = VehicleSize.Large

    constructor(licensePlate: string) {
        super();
        this.licensePlate = licensePlate;
    }

    public canFitInSpots(spot: ParkingSpot): boolean {
        return spot.getSize() == this.size
    }

    print(){
        console.log("B")
    }
}