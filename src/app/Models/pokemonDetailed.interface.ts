import { pokemonStat } from "./pokemonStat.interface";

export interface pokemonDetailed{
    ID: number,
    Name: string,
    Height: number,
    Weight:number,
    Experience: number,
    Stats: Array<pokemonStat>,
    Pictures: Array<string>,
    Abilities: Array<string>,
    Games: Array<string>
}