import { Injectable } from '@angular/core';
import { City } from '../interfaces/data/cities.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private storageKey = 'cities';

  setCities(cities: City[]): void {
    const citiesJson = JSON.stringify(cities);
    sessionStorage.setItem(this.storageKey, citiesJson);
  }

  getCities(): City[] {
    const citiesJson = sessionStorage.getItem(this.storageKey);
    return citiesJson ? JSON.parse(citiesJson) : [];
  }

  addCity(city: City): void {
    const cities = this.getCities();
    cities.push(city);
    this.setCities(cities);
  }

  removeCity(cityName: string): void {
    let cities = this.getCities();
    cities = cities.filter(city => city.name !== cityName);
    this.setCities(cities);
  }

  cityExists(cityName: string): boolean {
    const cities = this.getCities();
    return cities.some(city => city.name_complete.toLowerCase() === cityName.toLowerCase());
  }

  clearCities(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
