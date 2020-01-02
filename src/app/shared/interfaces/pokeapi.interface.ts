import { Results } from './results.interface';

export interface PokeAPI {
    count: number;
    next: string;
    results: Results[];
}