import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Settings } from '../types';

@Component({
  selector: 'password-settings',
  template: `
    <label for="length">Longueur du mot de passe : {{ defaultSettings.length }}</label>
      <input 
        id="length" 
        type="range" 
        min="10" 
        max="50" 
        name="length" 
        [(ngModel)]="defaultSettings.length" 
        (input)="onSettingsChange()"
      />

    <label>
      <input 
        [(ngModel)]="defaultSettings.uppercase" 
        (change)="onSettingsChange()"
        role="switch"
        type="checkbox" 
        name="uppercase" 
        id="uppercase"
      >Contiendra des majuscules
    </label>
    <label>
      <input 
        [(ngModel)]="defaultSettings.numbers" 
        (change)="onSettingsChange()"
        role="switch"
        type="checkbox" 
        name="numbers" 
        id="numbers"
      >Contiendra des nombres
    </label>
    <label>
      <input 
        [(ngModel)]="defaultSettings.symbols"
        (change)="onSettingsChange()"
        role="switch"
        type="checkbox" 
        name="symbols" 
        id="symbols"
      >Contiendra des caractères spéciaux
    </label>
  `,
  styles: [
  ]
})
export class PasswordSettingsComponent {
  @Input('default-settings')
  defaultSettings: Settings = {
    length: 20,
    uppercase: false,
    numbers: false,
    symbols: false,
  }  

  @Output('settings-change')
  onSettingsChangeEvent = new EventEmitter<Settings>();

  onSettingsChange() {
    this.onSettingsChangeEvent.emit(this.defaultSettings);
  }
}
