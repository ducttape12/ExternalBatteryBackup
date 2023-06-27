export class Game {
    id: number;
    title: string;
    platform: string;

    constructor(id: number, title: string, platform: string) {
        this.id = id;
        this.title = title;
        this.platform = platform;
    }
}