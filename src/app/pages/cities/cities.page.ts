import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { City } from 'src/app/core/interfaces/data/cities.interface';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.page.html',
  styleUrls: ['./cities.page.scss'],
})
export class CitiesPage implements OnInit {

  cities: City[];

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService,
    public actionSheetController: ActionSheetController
  ) {
    this.cities = [];
  }

  ngOnInit(): void {
    this.chargeCities();
  }

  chargeCities() {
    this.cities = this.sessionStorageService.getCities();
  }

  searchingCity() {
    this.router.navigate(['/select-city']);
  }

  deleteCity(city: City) {
    this.sessionStorageService.removeCity(city.name);
    this.chargeCities()
  }

  refreshCities(event: any) {
    setTimeout(() => {
      this.chargeCities();
      event.target.complete();
    }, 500);
  }

  async presentActionSheet(city: City) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons: [
        {
          text: 'Eliminar',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.deleteCity(city);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ]
    });
    await actionSheet.present();
  }

}
