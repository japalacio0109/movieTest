import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from './guards/auth.guard';
import { MovieComponent } from './movie/movie.component';
import { RecomendationComponent } from './recomendation/recomendation.component';

export const urlRoutes: Routes = [
  {
    path: 'movie',
    component: MovieComponent,
    canActivate: [AuthGuard],
    data: {
      name: 'Movies',
      needLogin: true
    }
  },
  {
    path: 'recomendation',
    component: RecomendationComponent,
    data: {
      name: 'Recomendations',
      needLogin: false
    }
  }
];

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: []
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'movie',
    component: MovieComponent,
    canActivate: [AuthGuard],
    data: {
      name: 'Movies',
      needLogin: true
    }
  },
  {
    path: 'recomendation',
    component: RecomendationComponent,
    data: {
      name: 'Recomendations',
      needLogin: false
    }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
