import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { pokemonDetailed } from 'src/app/Models/pokemonDetailed.interface';
import {PokemonAPIService} from '../../Services/PokemonApi/pokemon-api.service';



@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonDetailsComponent implements OnInit {

  constructor(private router: ActivatedRoute, private pokemonService: PokemonAPIService ) { }
  pokId:number=0;
  pokemonData: pokemonDetailed = {
    ID: 0,
    Name: '',
    Height: 0,
    Weight: 0,
    Experience: 0,
    Stats: [],
    Pictures: [],
    Abilities: [],
    Games: []
  };
  ngOnInit(): void {
    this.pokId = this.router.snapshot.queryParams['pokeId'];
    console.log(this.pokId);
    this.getAllPokemonDetails();
  }

  getAllPokemonDetails(){
    this.pokemonService.getPokemonByID(this.pokId).subscribe({
      next:(a)=>{
        let d = this.pokemonService.toPokemonDetails(a);
        this.pokemonData = d;
        console.log(a);
      },error:(e)=>{
        console.log(e);
      }
    });
  }

}
