import { Bus } from "@/models/Bus";
import ParkingLot from "@/models/ParkingLot";
import DatabaseManager from "@/lib/DatabaseManager";
import { Motorcycle } from "@/models/Motorcycle";

const DB = DatabaseManager.getInstance();
await DB.getConnection()

const parkingLot = await ParkingLot.create({})
const bus = await Bus.create({ licensePlate: crypto.randomUUID() })
const motorcycle = await Motorcycle.create({ licensePlate: crypto.randomUUID() })

const busStatus = await parkingLot.parkVehicle(bus)
const motorcycleStatus = await parkingLot.parkVehicle(motorcycle)


console.log(busStatus)
console.log(motorcycleStatus)

console.log( await bus.clearSpots() )
console.log( await motorcycle.clearSpots() )