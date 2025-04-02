import DatabaseManager from "@/lib/DatabaseManager";
import { NextApiRequest, NextApiResponse } from 'next';
import Vehicle, {TVehicle} from "@/models/Vehicle"
import { VehicleType } from "@/models/VehicleType";
import { VehicleClassMap } from "@/models/VehicleClassMap";

const DB = DatabaseManager.getInstance();

const createVehicle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { licensePlate, vehicleType} = req.body;

    try {
        await DB.getConnection();

        const vehicleData: TVehicle = (await Vehicle.findOne({ licensePlate }))!;
        if (vehicleData) {
            res.status(409).json({vehicleData, message: "Vehicle already exists"});
            return;
        }

        const vehicleClass = VehicleClassMap[vehicleType as VehicleType];
        if (!vehicleClass) {
            res.status(404).json({vehicleData, message: "vehicleType not found"});
            return;
        }
        const vehicle = await vehicleClass.create({ licensePlate });

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

        const vehicles = await Vehicle.find(); // return all vehicle
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

        const find = await Vehicle.findOne({ licensePlate }).lean();
        if (!find) {
            console.error("Vehicle not found");
            res.status(404).json({message: "Vehicle not found"});
        }
        await Vehicle.deleteOne({ licensePlate }).lean();
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

