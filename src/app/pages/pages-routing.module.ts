import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectCityPage } from './select-city/select-city.page';
import { HomePage } from './home/home.page';
import { CitiesPage } from './cities/cities.page';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'cities',
        component: CitiesPage
      },
      {
        path: 'select-city',
        component: SelectCityPage
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
