import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface WeatherData {
  main: { temp: number };
  weather: [{ description: string }];
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '6b28114097efa2972106e61851175370';
  private url = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient) {}

  getWeather(lat: number, lon: number): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.url}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    );
  }
}
