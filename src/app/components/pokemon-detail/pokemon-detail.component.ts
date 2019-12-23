import { Component, OnInit, Inject } from '@angular/core';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { PokemonDetails } from 'src/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  public pokemon: any;
  public pokemonName: string;
  public pokemonTypes: [];
  public types: any;

  constructor(
    private pokemonService: PokemonService,
    private dialogRef: MatDialogRef<PokemonDetailComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.pokemonName = data.name;
  }

  ngOnInit() {
    this.pokemonService.getPokemonDetails(this.pokemonName).subscribe((details: PokemonDetails) => {
      if (details) {
        this.pokemon = details;
        console.log(this.pokemon);
      }
    });
  }
}
