import { Bus } from "@/models/Bus";
import DatabaseManager from "@/lib/DatabaseManager";
import { Motorcycle } from "@/models/Motorcycle";
import ParkingManager from "@/lib/ParkingManager";

const DB = DatabaseManager.getInstance();
await DB.getConnection()

const PM = ParkingManager.getInstance();

const bus = await Bus.create({ licensePlate: crypto.randomUUID() })
const motorcycle = await Motorcycle.create({ licensePlate: crypto.randomUUID() })

const busStatus = await PM.park(bus.licensePlate)
const motorcycleStatus = await PM.park(motorcycle.licensePlate)

console.log(busStatus)
console.log(motorcycleStatus)

console.log( await bus.clearSpots() )
console.log( await motorcycle.clearSpots() )