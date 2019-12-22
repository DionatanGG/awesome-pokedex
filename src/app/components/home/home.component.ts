import { Component, OnInit } from '@angular/core';
import { Results } from 'src/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public search: string;
  public typeFilter: string;
  public pokemons: Array<Results>;
  public abilityFilter: Array<string>;
  constructor() { }

  ngOnInit() {
  }

  newPokemonSearch(search: string): void {
    if (this.search !== search) {
      this.search = search;
    }
  }

  newTypeSelected(filter: string): void {
    if (this.typeFilter !== filter) {
      this.typeFilter = filter;
    }
  }

  newAbilitiesSelected(abilities: Array<string>): void {
    if (this.abilityFilter !== abilities) {
      this.abilityFilter = abilities;
    }
  }

  exportPokemons(pokemons: Array<Results>): void {
    if (this.pokemons !== pokemons) {
      this.pokemons = pokemons;
    }
  }

}
