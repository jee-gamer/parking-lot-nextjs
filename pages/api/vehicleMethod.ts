import DatabaseManager from "@/lib/DatabaseManager";
import VehicleModel from "@/models/Vehicle"
import { NextApiRequest, NextApiResponse } from 'next';
import Bus from "@/lib/Bus";
import Car from "@/lib/Car";
import Motorcycle from "@/lib/Motorcycle";
import Vehicle from "@/lib/Vehicle"
import { VehicleType } from "@/models/VehicleType";
import ParkingSpot from "@/lib/ParkingSpot";
import { parkingSpotModel } from "@/models/ParkingSpot";

type VehicleClass = new (licensePlate: string) => Vehicle;

const VehicleClassMap: Record<VehicleType, VehicleClass> = {
    [VehicleType.Bus]: Bus,
    [VehicleType.Car]: Car,
    [VehicleType.Motorcycle]: Motorcycle,
};

const DB = DatabaseManager.getInstance();


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        await saveSpot(req, res)
    }
}

export default handler;