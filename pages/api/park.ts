import {NextApiRequest, NextApiResponse} from "next";
import ParkingManager from "@/lib/ParkingManager";

const parkingManager = ParkingManager.getInstance();

// park/{licensePlate, park: boolean}

const parkVehicle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { licensePlate } = req.body;
    try {
        const [status, message] = await parkingManager.park(licensePlate);
        res.status(status).json({ message: message });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: `Internal Server Error: ${error}` });
    }
}

const unparkVehicle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { licensePlate } = req.body
    try {
        const [status, message] = await parkingManager.unpark(licensePlate);
        res.status(status).json({ message: message });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: `Internal Server Error: ${error}` });
    }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(401).json({ message: `Method not allowed` });
        return;
    }
    const { park } = req.body;
    if (park) {
        await parkVehicle(req, res)
    } else {
        await unparkVehicle(req, res)
    }
}

export default handler