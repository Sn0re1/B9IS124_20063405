import { Component } from '@angular/core';
import { QuotesService } from '../services/quotes.service';
import { WeatherService } from '../services/weather.service';
import { Geolocation } from '@capacitor/geolocation';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { IonicModule, AlertController, Platform } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  currentQuote = '';
  weather = { temp: 0, description: '', location: '' };
  userName = '';

  constructor(
    private quotesService: QuotesService,
    private weatherService: WeatherService,
    private alertCtrl: AlertController,
    private platform: Platform
  ) {}

  async ionViewDidEnter() {
    console.log('HomePage entered');
    await this.platform.ready();

    setTimeout(async () => {
      await this.loadName();

      await this.requestLocationPermission();

      const status = await Geolocation.checkPermissions();
      if (status.location === 'granted') {
        await this.loadWeather();
      } else {
        console.warn('Location permission not granted; cannot load weather.');
      }
    }, 500);
  }

  async loadName() {
    const { value } = await Preferences.get({ key: 'userName' });
    console.log('Stored username:', value);

    if (value) {
      this.userName = value;
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Welcome!',
        message: 'Let’s personalize your experience',
        inputs: [
          {
            name: 'name',
            type: 'text',
            placeholder: 'Enter your name',
          },
        ],
        buttons: [
          {
            text: 'OK',
            handler: async (data) => {
              if (data.name) {
                this.userName = data.name;
                await Preferences.set({ key: 'userName', value: data.name });
                console.log('Saved username:', data.name);
              }
            },
          },
        ],
        backdropDismiss: false,
      });
      await alert.present();
    }
  }

  async requestLocationPermission() {
    try {
      const status = await Geolocation.checkPermissions();
      console.log('Initial permission status:', status);

      if (status.location !== 'granted') {
        const requestResult = await Geolocation.requestPermissions();
        console.log('Permission requested result:', requestResult);
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
    }
  }

  async loadWeather() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      console.log('Got location:', lat, lon);

      this.weatherService.getWeather(lat, lon).subscribe(
        (res) => {
          this.weather.temp = res.main.temp;
          this.weather.description = res.weather[0].description;
          this.weather.location = res.name;
        },
        (error) => {
          console.error('Weather fetch error:', error);
        }
      );
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }

  generateQuote() {
    this.currentQuote = this.quotesService.getRandomQuote();
    Haptics.impact({ style: ImpactStyle.Medium });
  }
}
