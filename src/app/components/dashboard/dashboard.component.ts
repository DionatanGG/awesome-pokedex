import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokeAPI, PokemonDetails, Results, TYPE_COLOURS } from 'src/interfaces';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Output() exportPokemons = new EventEmitter();
  @Input() set search(newSearch: string) {
    if (newSearch !== this.query) {
      this.query = newSearch;
    }
  }
  @Input() set typeFilter(type: string) {
    if (type !== this.typeFilter) {
      this.typeFilters = type;
    }
  }
  @Input() set abilityFilter(abilities: Array<string>) {
    if (abilities !== this.abilityFilters) {
      this.abilityFilters = abilities;
    }
  }

  public pokemonsLoaded: boolean;
  public pokemons: PokeAPI;
  public query: string;
  public abilityFilters: Array<string>;
  public typeFilters: string;

  constructor(private pokemonService: PokemonService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pokemonsLoaded = false;
    this.getPokemons();
  }

  public getPokemons(): void {
    this.pokemonService.getPokemon().subscribe((data: PokeAPI) => {
      this.pokemons = data;

      if (this.pokemons.results && this.pokemons.results.length) {
        this.pokemons.results.forEach(pokemon => {
          pokemon.id = pokemon.url.split('/')[
            pokemon.url.split('/').length - 2
          ];
          this.getPokemonDetails(pokemon);
          this.getPokemonSpeciesDetails(pokemon);
        });
      }
    });
  }

  getPokemonDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonDetails(pokemon.name)
      .subscribe((details: PokemonDetails) => {
        pokemon.details = details;
        if (pokemon.id === '151') {
          this.pokemonsLoaded = true;
          this.exportPokemons.emit(this.pokemons.results);
        }
      });
  }

  getPokemonSpeciesDetails(pokemon: Results): void {
    this.pokemonService
      .getPokemonSpecies(pokemon.name)
      .subscribe((species: any) => {
        const entries = species.flavor_text_entries;
        if (entries) {
          entries.some(flavor => {
            if (flavor.language.name === 'en') {
              pokemon.description = flavor.flavor_text;
            }
          });
        }
      });
  }

  _getTypeColour(type: string): string {
    if (type) {
      return '#' + TYPE_COLOURS[type];
    }
  }

  openDialog(pokemon: PokemonDetails) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = {
      name: pokemon.name
    };
    this.dialog.open(PokemonDetailComponent, dialogConfig);
  }
}
