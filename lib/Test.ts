import { Bus } from "@/models/Bus";
import ParkingLot from "@/models/ParkingLot";
import DatabaseManager from "@/lib/DatabaseManager";

const DB = DatabaseManager.getInstance();
await DB.getConnection()

const parkingLot = await ParkingLot.create({})
console.log(parkingLot)
const bus = await Bus.create({ licensePlate: "111" })
console.log(bus)

// const status = await parkingLot.parkVehicle(bus)
//
// console.log(status)