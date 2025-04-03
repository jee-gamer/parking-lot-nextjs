import ParkingLot, {TParkingLot} from "@/models/ParkingLot";
import Vehicle, {TVehicle} from "@/models/Vehicle";
import DatabaseManager from "@/lib/DatabaseManager";
import {VehicleClassMap} from "@/models/VehicleClassMap";
import {VehicleType} from "@/models/VehicleType";

const DB = await DatabaseManager.getInstance();

export default class ParkingManager {
    private static _instance: ParkingManager;

    private constructor() {
    };

    public static getInstance() {
        if (!ParkingManager._instance) {
            ParkingManager._instance = new ParkingManager();
        }
        return ParkingManager._instance;
    }

    async park(licensePlate: string): Promise<[status: number, message: string]> {
        await DB.getConnection()

        let parkingLot: TParkingLot = (await ParkingLot.findOne({}))!;
        if (!parkingLot) {
            parkingLot = await ParkingLot.create({})
        }

        let vehicle: TVehicle = (await Vehicle.findOne({licensePlate}).populate('parkingSpots'))!;

        if (!vehicle) {
            return [404, `Vehicle with licensePlate '${licensePlate}' not found`]
        }

        if (vehicle.parkingSpots.length > 0) {
            return [400, `Vehicle with licensePlate '${licensePlate}' already parked`]
        }

        await parkingLot.parkVehicle(vehicle);
        await parkingLot.save();
        await vehicle.save();

        return [200, `Successfully parked vehicle with licensePlate '${licensePlate}'`]
    }

    async unpark(licensePlate: string): Promise<[status: number, message: string]> {
        await DB.getConnection();

        let vehicle: TVehicle = (await Vehicle.findOne({ licensePlate }).populate('parkingSpots'))!;
        if (!vehicle) {
            return [404, `Vehicle with licensePlate '${licensePlate}' not found`]
        }

        if (vehicle.parkingSpots.length <= 0) {
            return [400, `Vehicle with licensePlate '${licensePlate}' is already unparked`]
        }

        await vehicle.clearSpots()
        await vehicle.save()
        return [200, `Successfully unparked vehicle with licensePlate '${licensePlate}'`]
    }

    async createVehicle(licensePlate: string, vehicleType: VehicleType):
        Promise<[status: number, vehicleData: TVehicle, message: string]>
    {
        await DB.getConnection();

        const vehicleData: TVehicle = (await Vehicle.findOne({ licensePlate }))!;
        if (vehicleData) {
            return [409, vehicleData, "Vehicle already exists"]
        }

        const vehicleClass = VehicleClassMap[vehicleType as VehicleType];
        if (!vehicleClass) {
            return [404, vehicleData, "vehicleType not found"]
        }
        const vehicle = await vehicleClass.create({ licensePlate });

        console.log("New vehicle created from API")
        return [201, vehicle, "Vehicle created"]
    }
}