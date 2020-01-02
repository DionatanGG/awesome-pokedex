import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PokeAPI } from '../interfaces/pokeapi.interface';
import { PokemonDetails } from '../interfaces/pokemon-details.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokeAPI: any;
  pokeSpeciesAPI: any;

  constructor(private http: HttpClient) {
    this.pokeAPI = environment.pokemonURL;
    this.pokeSpeciesAPI = environment.pokemonSpeciesURL;
  }

  /**
   * Retorna os 151 pokemons originais
   */
  getPokemon(): Observable<PokeAPI> {
    return this.http
      .get<PokeAPI>(`${this.pokeAPI}?limit=151`)
      .pipe(catchError(this._handleError));
  }

  /**
   * Retorna detalhes de cada pokemon usando nome como parâmetro
   */
  getPokemonDetails(name): Observable<PokemonDetails> {
    return this.http
      .get<PokemonDetails>(`${this.pokeAPI}/${name}`)
      .pipe(catchError(this._handleError));
  }

  /**
   * Retorna detalhes individuais das espécies usando nome como parâmetro
   */
  getPokemonSpecies(name): Observable<any> {
    return this.http
      .get<any>(`${this.pokeSpeciesAPI}/${name}`)
      .pipe(catchError(this._handleError));
  }

  /**
   * Trata os erros
   */
  private _handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocorreu um erro:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
