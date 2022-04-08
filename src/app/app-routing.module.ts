import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PokemonListComponent} from './Views/pokemon-list/pokemon-list.component';
import {PokemonDetailsComponent} from './Views/pokemon-details/pokemon-details.component';

const routes: Routes = [
  {path:'', redirectTo:'list', pathMatch:'full'},
  {path:'list', component: PokemonListComponent},
  {path:'details', component:PokemonDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [PokemonListComponent,PokemonDetailsComponent]
