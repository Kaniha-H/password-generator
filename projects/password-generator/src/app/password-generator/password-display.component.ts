import { Component, Input } from '@angular/core';

@Component({
  selector: 'password-display',
  template: `
    <div>
      <h3>Votre futur mot de passe :</h3>
      <article>
        <span *ngIf="password">{{ password }}</span>
        <span *ngIf="!password">Cliquez sur le bouton "Générer"</span>
      </article>
    </div>
  `,
  styles: [
  ]
})
export class PasswordDisplayComponent {
  @Input()
  password?: string;
}
