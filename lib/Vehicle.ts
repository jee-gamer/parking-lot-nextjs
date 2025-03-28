import { VehicleSize } from "@/models/VehicleSize"
import ParkingSpot from "@/lib/ParkingSpot";

export default abstract class Vehicle {
    parkingSpots: Array<ParkingSpot>;
    protected licensePlate: string;
    protected spotsNeeded: number;
    protected size: VehicleSize;

    protected constructor(licensePlate: string, spotsNeeded: number, vehicleSize: VehicleSize) {
        this.licensePlate = licensePlate;
        this.parkingSpots = new Array<ParkingSpot>();
        this.spotsNeeded = spotsNeeded;
        this.size = vehicleSize;
    }

    getSpotsNeeded() {
        return this.spotsNeeded;
    }

    getSize() {
        return this.size;
    }

    getLicensePlate() {
        return this.licensePlate;
    }

    parkInSpot(parkingSpot: ParkingSpot) {
        this.parkingSpots.push(parkingSpot);
    }

    clearSpots() {
        for (let i = 0; i < this.parkingSpots.length; i++) {
            this.parkingSpots[i].removeVehicle();
        }
        this.parkingSpots = []
    }

    getAttributes() {
        return {
            licensePlate: this.licensePlate,
            parkingSpots: this.parkingSpots,
            spotsNeeded: this.spotsNeeded,
            size: this.size,
            vehicleType: this.constructor.name,
        }

    }

    abstract canFitInSpots(spot: ParkingSpot): boolean;
    abstract print(): void;

}