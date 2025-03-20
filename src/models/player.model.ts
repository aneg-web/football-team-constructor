export interface Player {
    id: number;
    name: string;
    surname: string;
    number: number;
    position: string[];
    photo: string;
}

export interface Position {
    x: number,
    y: number,
}