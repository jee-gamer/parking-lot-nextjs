import { NextApiRequest, NextApiResponse } from 'next';
import ParkingManager from "@/lib/ParkingManager";

const parkingManager = ParkingManager.getInstance();

const getAllParkingSpots = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const [status, message, data] = await parkingManager.getAllParkingSpots();
        res.status(status).json({ message: message, data: data });

    } catch (error) {
        console.error("Error deleting vehicle:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default getAllParkingSpots