import Bus from "@/lib/Bus";
import DatabaseManager from "@/lib/DatabaseManager"

const DB = DatabaseManager.getInstance();
await DB.getConnection()
const bus = new Bus("3877")

await DB.saveVehicle(bus)