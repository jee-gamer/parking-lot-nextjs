import { VehicleSize } from "@/models/VehicleSize"
import ParkingSpot from "@/lib/ParkingSpot";

export default abstract class Vehicle {
    parkingSpots: Array<ParkingSpot>;
    protected licensePlate: string;
    protected spotsNeeded: number;
    protected size: VehicleSize;

    protected constructor(licensePlate: string, spotsNeeded: number, vehicleSize: VehicleSize) {
        this.parkingSpots = new Array<ParkingSpot>();
        this.licensePlate = licensePlate;
        this.spotsNeeded = spotsNeeded;
        this.size = vehicleSize;
    }

    getSpotsNeeded() {
        return this.spotsNeeded;
    }

    getSize() {
        return this.size;
    }

    parkInSpot(parkingSpot: ParkingSpot) {
        this.parkingSpots.push(parkingSpot);
    }

    clearSpots() {
        console.log(this.parkingSpots.length);

        for (let i = 0; i < this.parkingSpots.length; i++) {
            this.parkingSpots[i].removeVehicle();
        }
        this.parkingSpots = []
    }

    abstract canFitInSpots(spot: ParkingSpot): boolean;
    abstract print(): void;

}