import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { Results } from 'src/app/shared/interfaces/results.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() searchChange = new EventEmitter();
  @Output() typeSelected = new EventEmitter();
  @Output() abilitiesSelected = new EventEmitter();

  @Input() set pokemons(pokemons: Results[]) {
    if (pokemons !== this.pokemonList) {
      this.pokemonList = pokemons;

      this.pokemonList.forEach(pokemon => {
        this.setPokemonAbilities(pokemon);
        this.setPokemonTypes(pokemon);
      });
    }
  }

  public abilities: Array<string>;
  public types: Array<string>;
  public pokemonList: Array<Results>;
  public search: string;
  public currentType: string;
  public currentAbilities: Array<string>;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.abilities = [];
    this.types = [];
  }

  searchEvent(search: string): void {
    if (search === '') {
      this.search = search;
    }
    this.searchChange.emit(this.search);
  }

  onTypeSelected(): void {
    if (this.currentType) {
      this.typeSelected.emit(this.currentType);
    } else {
      this.typeSelected.emit('');
    }
  }

  onAbilitySelected(): void {
    if (this.currentAbilities && this.currentAbilities.length) {
      this.abilitiesSelected.emit(this.currentAbilities);
    } else {
      this.abilitiesSelected.emit('');
    }
  }

  setPokemonAbilities(pokemon: Results): void {
    if (pokemon) {
      pokemon.details.abilities.forEach(ability => {
        const abilityName = ability.ability.name;
        if (!this.abilities.includes(abilityName)) {
          this.abilities.push(abilityName);
          this.abilities.sort();
        }
      });
    }
  }

  setPokemonTypes(pokemon: Results): void {
    if (pokemon) {
      pokemon.details.types.forEach(type => {
        const typeName = type.type.name;
        if (!this.types.includes(typeName)) {
          this.types.push(typeName);
          this.types.sort();
        }
      });
    }
  }
}
