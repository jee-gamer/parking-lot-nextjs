import mongoose from "mongoose";
import { TParkingSpot } from "@/models/ParkingSpot"
import {TVehicle} from "@/models/Vehicle";

interface ILevel {
    floor: number;
    spots: [mongoose.Types.ObjectId];
    availableSpots: number;
    SPOTS_PER_ROW: number;
}

interface ILevelMethods {
    parkVehicle(vehicle: TVehicle): boolean,
    parkStartingAtSpot(spotNumber: number, vehicle: TVehicle): boolean,
    findAvailableSpots(vehicle: TVehicle): number
    spotFreed(): void
}

const levelSchema = new mongoose.Schema<ILevel>({
    floor: {
        type: Number,
        required: true,
    },
    spots: [{
        type: mongoose.Types.ObjectId,
        ref: "ParkingSpot",
    }],
    availableSpots: {
        type: Number,
        required: true,
    },
    SPOTS_PER_ROW: {
        type: Number,
        default: 10,
    }
})

levelSchema.methods.parkVehicle = async function (vehicle: TVehicle): Promise<boolean> {
    if (this.availableSpots < vehicle.spotsNeeded) {
        console.log("Not enough available spots")
        return false;
    }
    let spotNumber: number =  await this.findAvailableSpots(vehicle);
    if (spotNumber < 0) {
        console.log("Not enough available spots after check")
        return false;
    }
    return this.parkStartingAtSpot(spotNumber, vehicle);
}

levelSchema.methods.parkStartingAtSpot = async function (spotNumber: number, vehicle: TVehicle) {
    await vehicle.clearSpots();
    let success: boolean = true;
    for (let i = spotNumber; i < spotNumber + vehicle.spotsNeeded; i++) {
        const result = await this.spots[i].park(vehicle);
        success &&= result
    }
    this.availableSpots -= vehicle.spotsNeeded;
    console.log(`${success} at parking at the spot`);
    return success;
}

levelSchema.methods.findAvailableSpots = async function (vehicle: TVehicle): Promise<number> {
    let spotsNeeded: number = vehicle.spotsNeeded;
    let lastRow: number = -1;
    let spotsFound: number = 0;

    for (let i=0; i<this.spots.length; i++) {
        let spot: TParkingSpot = this.spots[i];
        if (lastRow != spot.row) { // if found the spot that's not the same row then it can't be used anymore so reset spot count and consider the row you just see.
            spotsFound = 0;
            lastRow = spot.row;
            console.log(`Set row to ${spot.row}`);
        }
        if (spot.canFitVehicle(vehicle)) {
            console.log(`Spots found`)
            spotsFound++;
        } else {
            spotsFound = 0;
        }
        if (spotsFound == spotsNeeded) {
            return i - (spotsNeeded - 1); // return i - those to get the first spot that the vehicle can park
        }
    }
    return -1;
}

levelSchema.methods.spotsFreed = function () {
    this.availableSpots++;
}

export type TLevel = ILevel & ILevelMethods;
export default levelSchema;