import { Component, OnInit, Input, EventEmitter, ViewChild, Output, OnDestroy } from '@angular/core';
import { MzModalComponent, MzBaseModal } from 'ngx-materialize';
import * as moment from 'moment';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Movie_ } from '../stores/movie/movie.model';
import { ReplaySubject, Observable } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { MovieService } from '../stores/movie/movie.service';
import { environment } from 'environments/environment';

declare var $: any;
@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.sass']
})
export class MovieFormComponent extends MzBaseModal implements OnInit, OnDestroy {
  
  @Input('auth-mode') authMode: 'login' | 'register' = 'login';
  @ViewChild('bottomSheetModal', { static: false }) modal: MzModalComponent;

  favoriteSeason: string;
  @Output() completedForm = new EventEmitter<Movie_>();
  selectDate: { startDate: moment.Moment, endDate: moment.Moment };

  movieForm: FormGroup;  
  ranges: any = {
    'Hoy': [moment().utc(true), moment().utc(true)],
    'Ayer': [moment().utc(true).subtract(1, 'days'), moment().utc(true).subtract(1, 'days')],
    'Ultimos 7 días': [moment().utc(true).subtract(6, 'days'), moment().utc(true)],
    'Ultimos 30 dias': [moment().utc(true).subtract(29, 'days'), moment().utc(true)],
    'Este mes': [moment().utc(true).startOf('month'), moment().utc(true).endOf('month')],
    'Ultimo mes': [moment().utc(true).subtract(1, 'month').startOf('month'), moment().utc(true).subtract(1, 'month').endOf('month')]
  };

  public modalOptions: Materialize.ModalOptions = {
    dismissible: true, // Modal can be dismissed by clicking outside of the modal
    opacity: .5, // Opacity of modal background
    inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute
  };

  public editFields$: Observable<boolean>;

  public movie$: Observable<Movie_>;

  imageUrl: {
    exists: boolean;
    val: string;
  } = {exists: false, val: ''};

  constructor(private movieService: MovieService) {
    super();
  }

  ngOnInit() {
    this.movieForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      author: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      description: new FormControl(null, [Validators.required, Validators.maxLength(500)]),
      image: new FormControl(null),
      init_date: new FormControl(null, [Validators.required]),
      end_date: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
    });
    this.movieService.currentMovie$.pipe(filter(it => !!it)).subscribe(it => {
      this.movieForm.patchValue({...it});
      const date = { startDate: moment(it.init_date), endDate: moment(it.end_date) };
      this.selectDate = date;
      this.imageUrl = ({ val: `${environment.token_auth_config.apiBase}/${it.image_url}`, exists: true });
      this.selectDateChange(this.selectDate);
    });
    this.editFields$ = this.movieService.editFields$.pipe(tap(it2 => it2 ? this.movieForm.enable() : this.movieForm.disable()));

    
  }

  resetData() {
    this.imageUrl = { exists: false, val: '' };
    this.movieService.currentMovie$.next(null);
    this.movieService.editFields$.next(true);
    this.movieForm.reset();
  }

  openDialog(mode: 'login' | 'register' = 'login') {
    this.authMode = mode;
    this.modal.openModal();
  }

  closeDialog() {
    this.modal.closeModal();
  }

  checkCheckBoxvalue($event) {
    this.movieForm.patchValue({ status: $event });
  }
  selectDateChange(it) {
    this.movieForm.patchValue({ init_date: it.startDate, end_date: it.endDate });
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.movieForm.patchValue({
        image: [file][0]
      });
    }
  }

  ngOnDestroy() {
    this.movieForm.reset();
  }

  onLoginFormResult(e) {
    if (e.signedIn) {
      this.closeDialog();
    } else {
      alert(e.err.json().errors[0]);
    }
  }

  onRegisterFormResult(e) {
    if (e.signedUp) {
      this.closeDialog();
    } else {
      alert(e.err.json().errors.full_messages[0]);
    }
  }

  onSubmit() {
    if (this.isFormValid()) {
      if (this.movieForm.controls['id'].value === null) {
        this.movieService.addMovie(<Movie_>this.movieForm.value);
      } else {
        this.movieService.updateMovie(<Movie_>this.movieForm.value);
        this.movieService.getMovieById(this.movieForm.controls['id'].value);
      }
    }
  }



  isFormValid() {
    return this.movieForm.valid;
  }

  isLoginMode() { return this.authMode === 'login'; }
  isRegisterMode() { return this.authMode === 'register'; }

}
