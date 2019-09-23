import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { dataFilter, Paginator } from 'app/services/http_base.service';
import { MovieService } from '../stores/movie/movie.service';
import { Observable } from 'rxjs';
import { Movie_ } from 'app/stores/movie/movie.model';
import { MovieQuery } from 'app/stores/movie/movie.query';
import { map, shareReplay, startWith } from 'rxjs/operators';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-recomendation',
  templateUrl: './recomendation.component.html',
  styleUrls: ['./recomendation.component.sass']
})
export class RecomendationComponent implements OnInit, OnDestroy {
  
  selectDate: { startDate: moment.Moment, endDate: moment.Moment } = { 
    startDate: moment().startOf('isoWeek'), 
    endDate: moment().endOf('isoWeek')
  };
  filters: dataFilter = {
    name: '',
    init_date: moment().startOf('isoWeek').format('YYYY-MM-DD'),
    end_date: moment().endOf('isoWeek').format('YYYY-MM-DD'),
    page: 1,
    status: true
  };
  movies$: Observable<Movie_[]>;
  paginator$: Observable<Paginator>;
  countMovies$: Observable<number>;
  
  constructor(private movieService: MovieService, private movieQuery: MovieQuery) { }

  ngOnInit() {
    this.movies$ = this.movieQuery.data$.pipe(
      map(it => it.map(it2 => (
        { 
          ...it2, 
          name: it2.name.toUpperCase(), 
          image_url: `${environment.token_auth_config.apiBase}/${it2.image_url}`
        }
        ))
      )
    );
    this.paginator$ = this.movieQuery.paginator$.pipe();
    this.countMovies$ = this.movieQuery.data$.pipe(map(it => it.length));
    this.loadData(this.filters);
  }

  ngOnDestroy(): void {
    this.endComponent();
  }

  loadData(filter?) {
    this.movieService.getAllMovies(filter);
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
