import DatabaseManager from "@/lib/DatabaseManager";
import VehicleModel from "@/models/Vehicle"
import { NextApiRequest, NextApiResponse } from 'next';
import Bus from "@/lib/Bus";
import Car from "@/lib/Car";
import Motorcycle from "@/lib/Motorcycle";
import Vehicle from "@/lib/Vehicle"
import { VehicleType } from "@/models/VehicleType";
import { VehicleClassMap } from "@/lib/VehicleClassMap";

type VehicleClass = new (licensePlate: string) => Vehicle;

const DB = DatabaseManager.getInstance();

const createVehicle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { licensePlate, vehicleType} = req.body;

    try {
        await DB.getConnection();

        const vehicleData = await VehicleModel.findOne({ licensePlate }).lean();
        if (vehicleData) {
            res.status(409).json({vehicleData, message: "Vehicle already exists"});
        }

        const vehicleClass = VehicleClassMap[vehicleType as VehicleType];
        const vehicle = new vehicleClass(licensePlate);
        const spotsNeeded = vehicle.getSpotsNeeded()
        const size = vehicle.getSize();

        const vehicleModel = new VehicleModel({
            licensePlate: licensePlate,
            vehicleType: vehicleType,
            spotsNeeded: spotsNeeded,
            size: size
        });
        // create a mongoose model

        await vehicleModel.save();
        console.log("New vehicle created from API")
        res.status(201).json(vehicle);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create vehicle" });
    }
};


const getVehicles = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
        await DB.getConnection();

        const vehicles = await VehicleModel.find(); // return all vehicle
        res.status(200).json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get vehicle" });
    }
}

const removeVehicles = async (req: NextApiRequest, res: NextApiResponse) => {
    const { licensePlate } = req.body;

    try {
        await DB.getConnection();

        const find = await VehicleModel.findOne({ licensePlate }).lean();
        if (!find) {
            console.error("Vehicle not found");
            res.status(404).json({message: "Vehicle not found"});
        }
        await VehicleModel.deleteOne({ licensePlate }).lean();
        res.status(200).json({message: "Vehicle deleted successfully"})

    } catch (error) {
        console.error("Error deleting vehicle:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        await createVehicle(req, res);
    } else if (req.method === "GET") {
        await getVehicles(req, res);
    } else if (req.method === "DELETE") {
        await removeVehicles(req, res);
    }
    else {
        console.error("Method Not Allowed");
        res.status(405).json({ message: "Method Not Allowed" });
    }
}

export default handler

