import { SaveSlot } from "./save-slot";

export class Game {
    constructor(public id: number, public title: string, public platform: string, public pinnedSaveSlotId: number,
        public saveSlots: SaveSlot[] = []) {
    }
}