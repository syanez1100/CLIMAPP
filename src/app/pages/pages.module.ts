import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageRoutingModule } from './pages-routing.module';

import { HomePage } from './home/home.page';
import { CitiesPage } from './cities/cities.page';
import { SelectCityPage } from './select-city/select-city.page';

import { register } from 'swiper/element/bundle';

register();

@NgModule({
  declarations: [
    HomePage,
    CitiesPage,
    SelectCityPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class PagesModule {}
