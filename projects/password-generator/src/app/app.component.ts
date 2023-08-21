import { Component } from '@angular/core';
import { PasswordGeneratorService } from './password-generator/password-generator.service';
import { Settings } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  password?: string;

  settings: Settings = {
    length: 25,
    uppercase: false,
    numbers: false,
    symbols: false,
  };

  constructor(private service: PasswordGeneratorService) {}

  get settingsCopy() {
    return { ...this.settings };
  }

  onSettingsChange(obj: Settings) {
    this.settings = obj;
  }

  onClickGenerate() {
    this.password = this.service.generate({
      length: this.settings.length,
      uppercase: this.settings.uppercase,
      numbers: this.settings.numbers,
      symbols: this.settings.symbols,
    });
  }
}
