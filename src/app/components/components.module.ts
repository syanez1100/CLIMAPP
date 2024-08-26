import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicensesComponent } from './licenses/licenses.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    LicensesComponent
  ],
  exports: [
    LicensesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    AppRoutingModule
  ]
})
export class ComponentsModule { }
