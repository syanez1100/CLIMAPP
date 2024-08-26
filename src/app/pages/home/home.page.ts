import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LicensesComponent } from 'src/app/components/licenses/licenses.component';
import { City } from 'src/app/core/interfaces/data/cities.interface';
import { ResponseOpenWeather } from 'src/app/core/interfaces/data/open-weather.interface';
import { OpenWeatherService } from 'src/app/core/services/open-weather.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cities: City[];
  cityActive: City;
  climateCityActive: ResponseOpenWeather | undefined;
  backgroundStyle: string | null = null;

  types = [
    { digit: 200, url: '/assets/galery/200.jpg' },
    { digit: 300, url: '/assets/galery/300.jpg' },
    { digit: 400, url: '/assets/galery/400.jpg' },
    { digit: 500, url: '/assets/galery/500.jpg' },
    { digit: 600, url: '/assets/galery/600.jpg' },
    { digit: 700, url: '/assets/galery/700.jpg' },
    { digit: 800, url: '/assets/galery/800.jpg' },
    { digit: 900, url: '/assets/galery/900.jpg' },
  ];

  constructor(
    private sessionStorageService: SessionStorageService,
    private openWeatherService: OpenWeatherService,
    private modalController: ModalController
  ) {
    this.backgroundStyle = `--background: url('/assets/galery/800.jpg') no-repeat bottom / cover !important;`;
    this.cities = [];
    this.cityActive = {
      name: '',
      name_complete: '',
      lat: 0,
      lon: 0
    };
  }

  ngOnInit(): void {
    this.chargeCities();
  }

  refreshCities(event: any) {
    setTimeout(() => {
      this.chargeCities();
      event.target.complete();
    }, 500);
  }

  chargeCities() {
    this.cities = this.sessionStorageService.getCities();
    if (this.cities.length === 0) return;
    this.cityActive = this.cities[0];
    this.loadClimate(this.cityActive);
  }

  changeSlide(event: any) {
    const activeIndex = event.target.swiper.activeIndex;
    const currentCity = this.cities[activeIndex];
    this.cityActive = currentCity;
    this.loadClimate(currentCity);
  }

  loadClimate(city: City) {
    this.openWeatherService.loadClimate(city).subscribe({
      next: (resp) => {
        this.climateCityActive = resp;
        this.applyBackgroundStyle(this.climateCityActive.weather[0].id);
      }
    })
  }

  applyBackgroundStyle(code: number): void {
    const codeStr = code.toString();
    const firstDigits = parseInt(codeStr[0], 10);
    if (code === 800) {
      const url = this.types.find(type => type.digit === 800)?.url
      this.backgroundStyle = `--background: url('${url}') no-repeat bottom / cover !important;`;
      return;
    }
    if (firstDigits === 8) {
      const url = this.types.find(type => type.digit === 900)?.url;
      this.backgroundStyle = `--background: url('${url}') no-repeat bottom / cover !important;`;
      return;
    }
    const url = this.types.find(type => type.digit === firstDigits * 100)?.url;
    this.backgroundStyle = `--background: url('${url}') no-repeat bottom / cover !important;`;
  }

  resetDb() {
    this.sessionStorageService.clearCities();
    this.chargeCities();
    this.cityActive = {
      name: '',
      name_complete: '',
      lat: 0,
      lon: 0
    };
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: LicensesComponent,
      canDismiss: true,
    });
    return await modal.present();
  }

}
