import { SaveSlot } from "./save-slot";

export class Game {
    constructor(public id: number, public title: string, public platform: string, public saveSlots: SaveSlot[] = []) {
    }
}