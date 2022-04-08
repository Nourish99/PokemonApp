import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {pokemonItemTable} from '../../Models/pokemonItemTable.interface';
import {pokemonDetailed} from '../../Models/pokemonDetailed.interface';


@Injectable({
  providedIn: 'root'
})
export class PokemonAPIService {

  url: string = "https://pokeapi.co/api/v2/pokemon";
  constructor(private http: HttpClient) { }

  getAllPokemons(limit:Number, offset:Number){
    return this.http.get<any>(this.url+"?limit="+limit+"&offset="+offset)
  }
  getPokemonByID(pId: number){
    return this.http.get<any>(this.url+"/"+pId+"/");
  }
  getSinglePokemon(pokemonDetailsUrl: string){
    return this.http.get<any>(`${pokemonDetailsUrl}`);
  }
 
  //Conversion functions
  toPokemonItemTable(pokes: any[]): pokemonItemTable[]{
    let newData = new Array<pokemonItemTable>();
    pokes.forEach(element => {
      this.getSinglePokemon(element.url).subscribe({
        next:(b)=>{
          newData.push({
            ID: b.id,
            Name: b.name,
            Icon: b.sprites.front_default,
            Exp: b.base_experience
          });
        },
        error:(e)=>{
          console.log(e);
        }
      });
    });
    return newData;
  }

  toPokemonDetails(pokemonDets:any){
    let data : pokemonDetailed={
      ID: pokemonDets.id,
      Name: pokemonDets.name,
      Height: pokemonDets.height,
      Pictures: [],
      Abilities: [],
      Games: [],
      Weight: pokemonDets.weight,
      Experience: pokemonDets.base_experience,
      Stats: []
    };
    
    pokemonDets.abilities.forEach((element: any) => {
      data.Abilities.push(element.ability.name);
    });

    if(pokemonDets.sprites.back_default!=null){data.Pictures.push(pokemonDets.sprites.back_default);}
    if(pokemonDets.sprites.back_female!=null){data.Pictures.push(pokemonDets.sprites.back_female);}
    if(pokemonDets.sprites.back_shiny!=null){data.Pictures.push(pokemonDets.sprites.back_shiny);}
    if(pokemonDets.sprites.back_shiny_female!=null){data.Pictures.push(pokemonDets.sprites.back_shiny_female);}
    if(pokemonDets.sprites.front_default!=null){data.Pictures.push(pokemonDets.sprites.front_default);}
    if(pokemonDets.sprites.front_female!=null){data.Pictures.push(pokemonDets.sprites.front_female);}
    if(pokemonDets.sprites.front_shiny!=null){data.Pictures.push(pokemonDets.sprites.front_shiny);}
    if(pokemonDets.sprites.front_shiny_female!=null){data.Pictures.push(pokemonDets.sprites.front_shiny_female);}


    pokemonDets.stats.forEach((element:any) => {
      data.Stats.push({
        statName: element.stat.name,
        value: element.base_stat,
        effort: element.effort
      })
    });

    pokemonDets.game_indices.forEach((element:any) => {
      data.Games.push("Pokemon "+element.version.name);
    });
    return data;
  }
}


