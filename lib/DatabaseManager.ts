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

    async saveParkingLot(parkingLot: ParkingLot) {
        const { id, levels, NUM_LEVELS } = parkingLot.getAttributes()
        const existedParkingLot = await ParkingLotModel.findOne({ _id: id });

        if (!existedParkingLot) {
            const parkingLotModel = new ParkingLotModel({
                levels: levels,
                NUM_LEVELS: NUM_LEVELS,
            })

            await parkingLotModel.save();
            parkingLot.id = parkingLotModel._id;
            console.log("ParkingLot created")
            return
        }

        existedParkingLot.levels = levels;
        await existedParkingLot.save();
        console.log("ParkingLot updated");
    }
}