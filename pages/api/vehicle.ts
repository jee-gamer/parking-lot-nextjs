import DatabaseManager from "@/lib/DatabaseManager";
import Vehicle from "@/models/Vehicle"
import { NextApiRequest, NextApiResponse } from 'next';

const DB = DatabaseManager.getInstance();

const createVehicle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { licensePlate, spotsNeeded, size } = req.body;

    try {
        await DB.getConnection();

        const vehicle = new Vehicle({ licensePlate, spotsNeeded, size }); // create a mongoose model
        await vehicle.save();
        res.status(201).json(vehicle);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create vehicle" });
    }
};


const getVehicles = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const vehicles = await Vehicle.find(); // return all vehicle
        res.status(200).json(vehicles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to get vehicle" });
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        await createVehicle(req, res);
    } else if (req.method === "GET") {
        await getVehicles(req, res);
    } else {
        console.error("Method Not Allowed");
        res.status(405).json({ message: "Method Not Allowed" });
    }
}

export default handler

