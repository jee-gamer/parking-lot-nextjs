import dbConnect from "@/lib/mongodb"
import Vehicle from "@/lib/Vehicle";
import ParkingSpot from "@/lib/ParkingSpot";

import VehicleModel from "@/models/Vehicle";
import { ParkingSpotModel } from "@/models/ParkingSpot";

export default class DatabaseManager {
    private static instance: DatabaseManager;
    private static connection: any; // I don't know what type this is
    // Also handle saving data

    private constructor() {
        // do nothing
    }

    static getInstance() {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
            DatabaseManager.connection = null; // no connection at first
        }
        return DatabaseManager.instance;
    }

    async getConnection() {
        if (!DatabaseManager.connection) {
            DatabaseManager.connection = await dbConnect();
        }
        return DatabaseManager.connection;
    }

    async saveVehicle(vehicle: Vehicle) {
        const { licensePlate, parkingSpots, spotsNeeded, size, vehicleType } = vehicle.getAttributes()
        const existedVehicle = await VehicleModel.findOne({ licensePlate })

        if (!existedVehicle) {
            const vehicleModel = new VehicleModel({
                licensePlate: licensePlate,
                parkingSpots: parkingSpots,
                spotsNeeded: spotsNeeded,
                size: size,
                vehicleType: vehicleType,
            });

            await vehicleModel.save();
            console.log("Vehicle created")
            return
        }

        // Vehicle already exists
        existedVehicle.parkingSpots = parkingSpots;
        await existedVehicle.save();
        console.log("Vehicle updated");
    }

    async saveParkingSpot(parkingSpot: ParkingSpot) {
        const { vehicle, spotSize, row, spotNumber, level } = parkingSpot.getAttributes()
        const existedParkingSpot = await ParkingSpotModel.findOne({ spotNumber: spotNumber, level: level });

        if (!existedParkingSpot) {
            const parkingSpotMdoel = new ParkingSpotModel({
                vehicle: vehicle,
                spotSize: spotSize,
                row: row,
                spotNumber: spotNumber,
                level: level,
            })

            await parkingSpotMdoel.save();
            console.log("ParkingSpot created")
            return
        }

        existedParkingSpot.vehicle = vehicle;
        await existedParkingSpot.save();
        console.log("ParkingSpot updated");
    }
}