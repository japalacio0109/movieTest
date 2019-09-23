import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieQuery } from 'app/stores/movie/movie.query';
import { Movie, Movie_ } from '../stores/movie/movie.model';
import { Observable, Subscription, Subject } from 'rxjs';
import { MovieService } from '../stores/movie/movie.service';
import { Angular2TokenService } from 'angular2-token';
import { AuthService } from 'app/services/auth.service';
import { MzModalService } from 'ngx-materialize';
import { MovieFormComponent } from 'app/movie-form/movie-form.component';
import { map, tap, shareReplay, filter, takeUntil, distinctUntilChanged, startWith } from 'rxjs/operators';
import { DataPaginate, Paginator, dataFilter } from 'app/services/http_base.service';
import * as moment from 'moment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.sass']
})
export class MovieComponent implements OnInit, OnDestroy {
  movies$: Observable<Movie_[]>;
  paginator$: Observable<Paginator>;
  countMovies$: Observable<number>;
  selectDate: { startDate: moment.Moment, endDate: moment.Moment };
  filters: dataFilter = {
    name: '',
    init_date: null,
    end_date: null,
    page: 1
  };

  constructor(
    private movieQuery: MovieQuery,
    private movieService: MovieService,
    public authTokenService: Angular2TokenService,
    public authService: AuthService,
    private modalService: MzModalService,
    private movieFormComponent: MovieFormComponent
    ) { 
      this.movieService.resetStore();
    }

  ngOnInit() {
    this.movies$ = this.movieQuery.data$;
    this.paginator$ = this.movieQuery.paginator$.pipe();
    this.countMovies$ = this.movieQuery.data$.pipe(map(it => it.length));
    this.loadData(this.filters);
  }

  ngOnDestroy(): void {
    this.endComponent();
  }

  loadData(filter?: dataFilter) {
    this.movieService.getAllMovies(filter);
  }

  setMovie(id: number = null, editFields: boolean = true) {
    if (id !== null) {
      this.movieService.getMovieById(id, editFields);
    } else {
      this.movieService.editFields$.next(editFields);
    }
    this.modalService.open(MovieFormComponent);
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id);
    this.loadData(this.filters);
    
  }

  onPageChange(event) {
    if (this.filters.page !== event) {
      this.filters.page = event;
      this.loadData(this.filters);
    }
  }

  clearFilters() {
    this.endComponent();
    this.loadData(this.filters);
  }

  endComponent() {
    this.filters = {
      name: '',
      init_date: null,
      end_date: null,
      page: 1
    };
    this.selectDate = { startDate: null, endDate: null };
    this.movieService.resetStore();
  }

  filterByDate(event: { startDate: moment.Moment, endDate: moment.Moment }) {
    if (event.startDate) {
      if (!event.startDate.format('YYYY-MM-DD').includes(this.filters.init_date) 
       && !event.endDate.format('YYYY-MM-DD').includes(this.filters.end_date)) {
        this.filters.init_date = event.startDate.format('YYYY-MM-DD');
        this.filters.end_date = event.endDate.format('YYYY-MM-DD');
        this.filters.page = 1;
        this.loadData(this.filters);
      }
    }
  }

  filterByName(event) {
    this.filters.page = 1;
    this.loadData(this.filters);
  }

}
