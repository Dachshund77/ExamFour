import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'races', loadChildren: () => import('./modules/races/races.module').then(m => m.RacesModule) },
  { path: 'teams', loadChildren: () => import('./modules/teams/teams.module').then(m => m.TeamsModule) },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  goTest() {
    window.location.href = 'http://www.cnn.com/';
  }
}
