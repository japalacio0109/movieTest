import { Movie, Movie_ } from './movie.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface MovieState extends EntityState<Movie> { }
@Injectable({
    providedIn: 'root'
})
@StoreConfig({ name: 'movie' })
export class MovieStore extends EntityStore<MovieState> {
    constructor() {
        super();
    }
}