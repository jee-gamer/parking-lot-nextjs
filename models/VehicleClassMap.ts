import {VehicleType} from "@/models/VehicleType";
import {TVehicle} from "@/models/Vehicle";
import {Bus} from "@/models/Bus";
import {Car} from "@/models/Car";
import {Motorcycle} from "@/models/Motorcycle";
import {Model} from "mongoose";

export const VehicleClassMap: Record<VehicleType, Model<TVehicle>> = {
    [VehicleType.Bus]: Bus,
    [VehicleType.Car]: Car,
    [VehicleType.Motorcycle]: Motorcycle,
};