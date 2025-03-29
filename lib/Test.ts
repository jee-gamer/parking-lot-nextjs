import Bus from "@/models/Bus";
import DatabaseManager from "@/lib/DatabaseManager"
import ParkingLot from "@/lib/ParkingLot";

const DB = DatabaseManager.getInstance();
await DB.getConnection()

const parkingLot = new ParkingLot()
await DB.saveParkingLot(parkingLot)
const bus = new Bus("5477")
await DB.saveVehicle(bus)

const status = await parkingLot.parkVehicle(bus)

console.log(status)