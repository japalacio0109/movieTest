import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Angular2TokenService } from 'angular2-token';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';
import { MzModalModule } from 'ngx-materialize';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { AuthService } from './services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { MovieComponent } from './movie/movie.component';
import { RecomendationComponent } from './recomendation/recomendation.component';
import { MzNavbarModule } from 'ngx-materialize';
import { MzCollectionModule } from 'ngx-materialize';
import { MzIconModule, MzIconMdiModule } from 'ngx-materialize';
import { HttpClientModule } from '@angular/common/http';
import { MzButtonModule } from 'ngx-materialize';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { MzInputModule } from 'ngx-materialize';
import { MzTextareaModule } from 'ngx-materialize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MzDatepickerModule } from 'ngx-materialize';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { MoviesAppMaterialModule } from './material.module';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MzCheckboxModule } from 'ngx-materialize';
import { MzRadioButtonModule } from 'ngx-materialize';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MzSwitchModule } from 'ngx-materialize';
import { MzCardModule } from 'ngx-materialize';
import { MzPaginationModule } from 'ngx-materialize';
@NgModule({
  entryComponents: [AuthDialogComponent, MovieFormComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    AuthDialogComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
    MovieComponent,
    RecomendationComponent,
    MovieFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MzModalModule,
    MzNavbarModule,
    MzCollectionModule,
    MzIconModule,
    MzIconMdiModule,
    HttpClientModule,
    MzButtonModule,
    MzInputModule,
    MzTextareaModule,
    MzDatepickerModule,
    MzCheckboxModule,
    MzRadioButtonModule,
    MzSwitchModule,
    MoviesAppMaterialModule,
    NgxDaterangepickerMd.forRoot(),
    MzCardModule,
    MzPaginationModule
    
  ],
  providers: [Angular2TokenService, AuthService, AuthGuard, { provide: MAT_DIALOG_DATA, useValue: [] }, {
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'accent' },
  }, MovieFormComponent ],
  bootstrap: [AppComponent]
})
export class AppModule { }
