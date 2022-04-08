import { Component, OnInit } from '@angular/core';
import {PokemonAPIService} from '../../Services/PokemonApi/pokemon-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  //Properties
  displayedColumns: string[] = ['position', 'image', 'name'];
  data: any[]=[];
  pages:number=1;
  totalPokemons = 0;

  constructor(private pokemonService: PokemonAPIService, private router: Router ) { }

  ngOnInit(): void {
    this.getPokemonBlock();
  }

  getPokemonBlock(){
    let pokemonsData;
    pokemonsData=this.pokemonService.getAllPokemons(12,12*(this.pages-1)).subscribe({
      next: (v) => {
        this.totalPokemons = v.count;
        pokemonsData = this.pokemonService.toPokemonItemTable(v.results);
        //console.log(pokemonsData);
        console.log(pokemonsData);
        this.data = pokemonsData;
      },
      error: (e) => console.error(e)
    })
  }
  seeDetails(id: number){
    this.router.navigate(['/details'],{queryParams:{pokeId:id}});
  }
  getPokemons():any{
    return this.data;
  }

}
