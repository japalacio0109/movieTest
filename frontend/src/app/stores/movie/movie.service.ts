import { Injectable } from "@angular/core";
import { Subject, Observable, ReplaySubject } from 'rxjs';
import { environment, apiUrls } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpBaseService, dataFilter } from '../../services/http_base.service';
import { Movie, Movie_ } from './movie.model';
import { MovieStore } from "./movie.store";
import { Angular2TokenService } from "angular2-token";

@Injectable({
    providedIn: 'root'
})
export class MovieService extends HttpBaseService {

    urlBase = 'movie';
    filters: string;
    currentMovie$: ReplaySubject<Movie_> = new ReplaySubject<Movie_>(1);
    editFields$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
    localFiltering$: ReplaySubject<dataFilter> = new ReplaySubject<dataFilter>(1);
    constructor(private movieStore: MovieStore, http: HttpClient, authService: Angular2TokenService) {
        super(http, authService);
    }

    restartFilters() {
        this.filters = '';
    }

    resetStore() {
        this.movieStore.reset();
        this.movieStore.setLoading(true);
        this.currentMovie$.next(null);
        this.editFields$.next(true);
    }
    
    getAllMovies(filters?: dataFilter | string) {
        if (typeof filters !== 'string') {
            this.filters = this.getUrlParams(filters);
        }
        this.getAllData<Movie_>(this.urlBase, this.filters)
            .subscribe(it => {
                this.movieStore.set({data: it});
                this.movieStore.setLoading(false);
                this.movieStore.setActive('data');
            });
    }

    getMovieById(id: number, editfields: boolean = true) {
        this.editFields$.next(editfields);
        this.getDataById<Movie_>(this.urlBase, id).subscribe(it => this.currentMovie$.next(it));
    }

    addMovie(it: Movie_) {
        this.savewithFiles<Movie_>(this.urlBase, it)
            .subscribe(() => this.getAllMovies(this.filters));
    }

    deleteMovie(id: number) {
        this.deleteData<Movie_>(this.urlBase, id)
            .subscribe(() => this.getAllMovies(this.filters));
    }

    updateMovie(it: Movie_) {
        this.updateWithFiles<Movie_>(this.urlBase, it, it.id)
            .subscribe(() => this.getAllMovies(this.filters));
    }

    getRecomendations() {

    }
}