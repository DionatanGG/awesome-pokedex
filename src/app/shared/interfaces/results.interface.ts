import { PokemonDetails } from './pokemon-details.interface';

export interface Results {
    name: string;
    url: string;
    id?: string;
    details?: PokemonDetails;
    description?: string;
}