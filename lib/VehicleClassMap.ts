import {VehicleType} from "@/models/VehicleType";
import Bus from "@/lib/Bus";
import Car from "@/lib/Car";
import Motorcycle from "@/lib/Motorcycle";

export const VehicleClassMap: Record<VehicleType, VehicleClass> = {
    [VehicleType.Bus]: Bus,
    [VehicleType.Car]: Car,
    [VehicleType.Motorcycle]: Motorcycle,
};