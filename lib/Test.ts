import { Bus } from "@/models/Bus";
import ParkingLot from "@/models/ParkingLot";
import DatabaseManager from "@/lib/DatabaseManager";
import { Motorcycle } from "@/models/Motorcycle";
import ParkingManager from "@/lib/ParkingManager";

const DB = DatabaseManager.getInstance();
await DB.getConnection()

const PM = ParkingManager.getInstance();

const parkingLot = await ParkingLot.getOrCreate()
console.log(parkingLot)
const parkingLot2 = await ParkingLot.getOrCreate()
console.log(parkingLot)

console.log(parkingLot2 == parkingLot)

// const bus = await Bus.create({ licensePlate: crypto.randomUUID() })
// const motorcycle = await Motorcycle.create({ licensePlate: crypto.randomUUID() })
//
//
//
// const busStatus = await PM.park(bus.licensePlate)
// const motorcycleStatus = await PM.park(motorcycle.licensePlate)
//
//
// console.log(busStatus)
// console.log(motorcycleStatus)

// console.log( await bus.clearSpots() )
// console.log( await motorcycle.clearSpots() )