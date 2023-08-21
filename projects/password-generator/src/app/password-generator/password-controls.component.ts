import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'password-controls',
  template: `
    <button id="generate" (click)="onClickGenerate()">Générer</button>
    <button id="copy" (click)="onClickCopy()" *ngIf="password">Copier le mot de passe</button>
    <span *ngIf="hasBeenCopied" id="copy-message">Le mot de passe a été copié</span>
  `,
  styles: [
  ]
})
export class PasswordControlsComponent {
  hasBeenCopied = false;

  @Output('generate')
  onGenerateEvent = new EventEmitter();

  @Input()
  password?: string;

  ngOnChanges(changes: SimpleChanges) {
    if(!changes['password']) {
      return;
    }

    this.hasBeenCopied = false;
  }

  onClickCopy(){
    if(!this.password) {
      return;
    }

    navigator.clipboard.writeText(this.password);
    this.hasBeenCopied = true;
  }

  onClickGenerate() {
    this.onGenerateEvent.emit();
  }
}
