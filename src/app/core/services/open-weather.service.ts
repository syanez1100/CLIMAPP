import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseMapBox } from '../interfaces/data/mapbox.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../interfaces/data/cities.interface';
import { ResponseOpenWeather } from '../interfaces/data/open-weather.interface';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
  private apiUrl = environment.urlOpenWeather;
  private apiKey = environment.apiKeyOpenWeather;

  constructor(
    private http: HttpClient
  ) { }

  loadClimate(city: City): Observable<ResponseOpenWeather>{
    const url = this.apiUrl.replace('{lat}', (city.lat).toLocaleString())
    .replace('{lon}', (city.lon).toLocaleString())
    .replace('{apiKey}', this.apiKey);
    return this.http.get<ResponseOpenWeather>(`${url}`);
  }
}
