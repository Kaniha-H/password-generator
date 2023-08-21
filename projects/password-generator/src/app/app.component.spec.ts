import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { AppComponent } from "./app.component";
import { PasswordGeneratorModule } from "./password-generator/password-generator.module";
import { PasswordGeneratorService } from "./password-generator/password-generator.service";

describe('AppComponent avec Spectator', () => {
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [AppComponent],
    mocks: [PasswordGeneratorService],
    imports: [PasswordGeneratorModule]
  });

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  })

  it('should work', () => {
    const article = spectator.query('article');
    expect(article?.textContent).toBe('Cliquez sur le bouton "Générer"')
  })

  it('should change message when user clicks on generate button', async () => {
    const service = spectator.inject(PasswordGeneratorService);
    service.generate.and.returnValue('MOCK_PASSWORD');

    spectator.click('button');
    expect(spectator.query('article')).toHaveText('MOCK_PASSWORD');
  })

  it('should update settings when user cliks on checkboxes', async () => {
    spectator.click('#uppercase');
    expect(component.settings.uppercase).toBeTrue();

    spectator.click('#numbers');
    expect(component.settings.numbers).toBeTrue();

    spectator.click('#symbols');
    expect(component.settings.symbols).toBeTrue();

    spectator.typeInElement('33', '#length');
    expect(component.settings.length).toBe(33);
  })

  it('should show a copy button when a password was generated', () => {
    const service = spectator.inject(PasswordGeneratorService);
    service.generate.and.returnValue('MOCK_PASSWORD');
    
    spectator.click('#generate');

    expect(spectator.query('#copy')).not.toBeNull();
  })
})

describe('AppComponent avec TestBed', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent,],
      imports: [PasswordGeneratorModule]
    }).compileComponents(); // si le html est séparé du js

    fixture = TestBed.createComponent(AppComponent);
    fixture.autoDetectChanges();

    component = fixture.componentInstance;
  })

  it('should work', () => {
    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('Cliquez sur le bouton "Générer"')
  })

  it('should change message when user clicks on generate button', () => {
    const service = TestBed.inject(PasswordGeneratorService);

    const spy = spyOn(service, 'generate');
    spy.and.returnValue('MOCK_PASSWORD');

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    const article = fixture.nativeElement.querySelector('article');
    expect(article.textContent).toBe('MOCK_PASSWORD');
  })

  it('should update settings when user cliks on checkboxes', () => {
    fixture.nativeElement.querySelector('#uppercase').click();
    expect(component.settings.uppercase).toBeTrue();

    fixture.nativeElement.querySelector('#numbers').click();
    expect(component.settings.numbers).toBeTrue();

    fixture.nativeElement.querySelector('#symbols').click();
    expect(component.settings.symbols).toBeTrue();

    const length = fixture.nativeElement.querySelector('#length')
    length.value = 33;
    length.dispatchEvent(new Event('input'));

    expect(component.settings.length).toBe(33);
  })

  it('should show a copy button when a password was generated', () => {
    const service = TestBed.inject(PasswordGeneratorService);
    const spy = spyOn(service, 'generate');
    spy.and.returnValue('MOCK_PASSWORD');
    
    fixture.nativeElement.querySelector('#generate').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#copy')).not.toBeNull();
  })
})