import { Component, ViewChild } from '@angular/core';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { City } from 'src/app/core/interfaces/data/cities.interface';
import { Cities } from 'src/app/core/interfaces/data/mapbox.interface';
import { MapBoxService } from 'src/app/core/services/map-box.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.page.html',
  styleUrls: ['./select-city.page.scss'],
})
export class SelectCityPage {
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar | undefined;

  cities: Cities[];

  principalCities = [
    "Bogotá",
    "Medellín",
    "Cali",
    "Barranquilla",
    "Cartagena",
    "Cúcuta",
    "Bucaramanga",
    "Pereira",
    "Santa Marta",
    "Manizales"
  ];

  constructor(
    private openCageDataService: MapBoxService,
    private sessionStorageService: SessionStorageService,
    private toastController: ToastController
  ) {
    this.cities = [];
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.searchbar?.setFocus();
    }, 100);
  }

  searchCities(event: any) {
    const city = event.detail.value;
    if (city.length === 0) {
      this.cities = [];
      return;
    }
    this.filterCities(city);
  }

  filterCities(city: string) {
    this.openCageDataService.searchCities(city).subscribe({
      next: (resp) => {
        this.cities = resp.features;
      }
    });
  }

  async addCity(city: Cities) {
    const cityExists = this.sessionStorageService.cityExists(city.place_name);

    if (cityExists) {
      return await this.presentToast('La ciudad ya existe.');
    }
    const newCity: City = {
      name: city.text,
      name_complete: city.place_name,
      lat: city.geometry?.coordinates[1],
      lon: city.geometry?.coordinates[0]
    }
    this.sessionStorageService.addCity(newCity);
    await this.presentToast('Ciudad añadida correctamente.');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

}
