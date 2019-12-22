import { Component, OnInit, Inject } from '@angular/core';
import { PokemonService } from 'src/app/shared/services/pokemon.service';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails, PokeAPI } from 'src/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {
  public pokemon: PokemonDetails;
  public pokemonName: string;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<PokemonDetailComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.pokemonName = data.name;
  }

  ngOnInit() {
    this.pokemonService.getPokemonDetails(this.pokemonName).subscribe((details: PokemonDetails) => {
      this.pokemon = details;
    });
  }
}
