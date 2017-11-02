import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { routeConfig, routeNames } from './config/routes';

const routes: Routes = [
  { path: routeNames.default, pathMatch: routeConfig.pathMatch.FULL, component: MainComponent },
  { path: routeNames.none, pathMatch: routeConfig.pathMatch.FULL, component: NoPageFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
