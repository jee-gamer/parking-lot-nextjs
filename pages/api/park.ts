import DatabaseManager from "@/lib/DatabaseManager";
import {NextApiRequest, NextApiResponse} from "next";
import ParkingLot from "@/models/ParkingLot";
import Vehicle, {TVehicle} from "@/models/Vehicle";
import {TParkingLot} from "@/models/ParkingLot";

const DB = DatabaseManager.getInstance();

// park/{licensePlate, park: boolean}

const parkVehicle = async (req: NextApiRequest, res: NextApiResponse) => {
    const licensePlate = req.body.licensePlate;
    try {
        await DB.getConnection();

        let parkingLot: TParkingLot = (await ParkingLot.findOne({}))!;
        if (!parkingLot) {
            parkingLot = await ParkingLot.create({})
        }

        let vehicle: TVehicle = (await Vehicle.findOne({ licensePlate }).populate('parkingSpots'))!;

        if (!vehicle) {
            res.status(404).json({ message: `Vehicle with licensePlate '${licensePlate}' not found` });
            return
        }

        if (vehicle.parkingSpots.length > 0) {
            res.status(400).json({ message: `Vehicle with licensePlate '${licensePlate}' already parked`})
            return
        }

        await parkingLot.parkVehicle(vehicle);
        await parkingLot.save();
        await vehicle.save();

        res.status(200).json({ message: `Successfully parked vehicle with licensePlate '${licensePlate}'` });
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: `Internal Server Error: ${error}` });
    }
}

const unparkVehicle = async (req: NextApiRequest, res: NextApiResponse) => {
    const { licensePlate } = req.body
    try {
        await DB.getConnection();

        let vehicle: TVehicle = (await Vehicle.findOne({ licensePlate }).populate('parkingSpots'))!;
        if (!vehicle) {
            res.status(404).json({ message: `Vehicle with licensePlate '${licensePlate}' not found` });
            return
        }

        if (vehicle.parkingSpots.length <= 0) {
            res.status(400).json({ message: `Vehicle with licensePlate '${licensePlate}' is already unparked`})
            return
        }

        await vehicle.clearSpots()
        await vehicle.save()
        res.status(200).json({ message: `Successfully unparked vehicle with licensePlate '${licensePlate}'` });

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