import dbConnect from "@/lib/mongodb"
import Vehicle from "@/lib/Vehicle";
import {VehicleClassMap} from "@/lib/VehicleClassMap";
import VehicleModel from "@/models/Vehicle";

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
        const { licensePlate, parkingSpots, spotsNeeded, size, vehicleType } = vehicle.getAttribute()
        const existedVehicle = VehicleModel.findOne({ licensePlate })

        if (!existedVehicle) {
            const vehicleModel = new VehicleModel({
                licensePlate: licensePlate,
                parkingSpots: parkingSpots,
                spotsNeeded: spotsNeeded,
                size: size,
                vehicleType: vehicleType,
            });

            await vehicleModel.save();
            console.log("Vehicle created");
        }

        // Vehicle already exists
        existedVehicle.parkingSpots = parkingSpots;
        await existedVehicle.save();
        console.log("Vehicle updated");
    }
}