import { QueryEntity } from '@datorama/akita';
import { MovieState, MovieStore } from './movie.store';
import { Injectable } from '@angular/core';
import { map, filter, tap, switchMap } from 'rxjs/operators';
import { Movie } from './movie.model';

@Injectable({
    providedIn: 'root'
})
export class MovieQuery extends QueryEntity<MovieState> {
    constructor(protected store: MovieStore) {
        super(store);
    }

    isLoading$ = this.selectLoading();
    data$ = this.select(it => it).pipe(filter(it => !it.loading), map(it => it.entities['data'].data));
    paginator$ = this.select(it => it).pipe(filter(it => !it.loading), map(it => it.entities['data'].meta));
}
