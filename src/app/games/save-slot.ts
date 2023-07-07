import { SaveSlotType } from "./save-slot-type";
import { Save } from "./save";

export class SaveSlot {
    constructor(public id: number, public description: string, public type: SaveSlotType, public saves: Save[] = []) {

    }
}