import dbConnect from "@/lib/mongodb"
import Vehicle from "@/lib/Vehicle";
import ParkingLot from "@/lib/ParkingLot";

import VehicleModel from "@/models/Vehicle";
import ParkingLotModel from "@/models/ParkingLot";

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
        const existingVehicle = await VehicleModel.findOne({ _id: vehicle._id });

        if (!existingVehicle) {
            console.log("Vehicle created");
        } else {
            console.log("Vehicle updated");
        }
        await vehicle.save()
    }

    async saveParkingLot(parkingLot: ParkingLot) {
        const existedParkingLot = await ParkingLotModel.findOne({ _id: parkingLot._id });

        if (!existedParkingLot) {
            console.log("ParkingLot created")
        } else {
            console.log("ParkingLot updated");
        }
        await parkingLot.save()
    }
}