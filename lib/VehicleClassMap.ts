import {VehicleType} from "@/models/VehicleType";
import Bus from "@/models/Bus";
import Car from "@/models/Car";
import Motorcycle from "@/models/Motorcycle";

export const VehicleClassMap: Record<VehicleType, VehicleClass> = {
    [VehicleType.Bus]: Bus,
    [VehicleType.Car]: Car,
    [VehicleType.Motorcycle]: Motorcycle,
};