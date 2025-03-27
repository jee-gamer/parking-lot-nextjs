import Level from "@/lib/Level"
import Vehicle from "@/lib/Vehicle";

export default class ParkingLot {
    private levels: Level[];
    private NUM_LEVELS: number = 5;

    constructor() {
        this.levels = Array.from({ length: this.NUM_LEVELS }, (_, i) => new Level(i, 10)); // 10 spots per level for now
    }

    public parkVehicle(vehicle: Vehicle) {
        for (let i=0; i< this.levels.length; i++) {
            if (this.levels[i].parkVehicle(vehicle)) {
                return true;
            }
        }
        return false;
    }
}