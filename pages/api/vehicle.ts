import { NextApiRequest, NextApiResponse } from 'next';
import Vehicle from "@/models/Vehicle"
import ParkingManager from "@/lib/ParkingManager";

const parkingManager = ParkingManager.getInstance();

const createVehicle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { licensePlate, vehicleType } = req.body;

    try {
       const [status, vehicle, message] = await parkingManager.createVehicle(licensePlate, vehicleType);
       res.status(status).json({ vehicle,  message: message })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create vehicle" });
    }
};


const getVehicles = async (_req: NextApiRequest, res: NextApiResponse) => {
    try {
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
        const [status, message] = await parkingManager.removeVehicle(licensePlate);
        res.status(status).json({message: message})

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

