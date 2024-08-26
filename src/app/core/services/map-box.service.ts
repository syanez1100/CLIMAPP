import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseMapBox } from '../interfaces/data/mapbox.interface';

@Injectable({
  providedIn: 'root'
})
export class MapBoxService {
  private apiUrl = environment.urlMapBox;
  private apiKey = environment.apiKeyMapBox;

  constructor(
    private http: HttpClient
  ) { }

  searchCities(city: string): Observable<ResponseMapBox>{
    const url = this.apiUrl.replace('{city}', city).replace('{apiKey}', this.apiKey);
    return this.http.get<ResponseMapBox>(`${url}`);
  }
}
