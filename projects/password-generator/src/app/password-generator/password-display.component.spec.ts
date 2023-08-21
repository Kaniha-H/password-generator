import { Component } from "@angular/core";
import { PasswordDisplayComponent } from "./password-display.component";
import { TestBed } from "@angular/core/testing";
import { Spectator, SpectatorHost, createComponentFactory, createHostFactory } from "@ngneat/spectator";

@Component({
    selector: 'test',
    template: `
        <password-display password="MOCK_PASSWORD"></password-display>
    `
})
class TestComponent {}

@Component({
    selector: 'test',
    template: `
        <password-display></password-display>
    `
})
class TestDefaultComponent {}

describe('PasswordDisplayComponent avec TestBed', () => {
    it('should display the input password', () => {
        TestBed.configureTestingModule({
            declarations: [PasswordDisplayComponent, TestComponent]
        });

        const fixture = TestBed.createComponent(TestComponent);
        fixture.autoDetectChanges();

        const article = fixture.nativeElement.querySelector('article');
        expect(article.textContent).toContain('MOCK_PASSWORD');
    })

    it('should display a phrase when no password given', () => {
        TestBed.configureTestingModule({
            declarations: [PasswordDisplayComponent, TestDefaultComponent]
        });

        const fixture = TestBed.createComponent(TestDefaultComponent);
        fixture.autoDetectChanges();

        const article = fixture.nativeElement.querySelector('article');
        expect(article.textContent).toContain('Cliquez sur le bouton "Générer"');
    })

})

describe('PasswordDisplayComponent avec Spectator', () => {
    let spectator: SpectatorHost<TestComponent>;

    const createComponent = createHostFactory({
        component: PasswordDisplayComponent,
    });

    it('should display a phrase when no password given', () => {
        spectator = createComponent(`
            <password-display></password-display>
        `)

        expect(spectator.query('article')).toHaveText('Cliquez sur le bouton "Générer"');
    })

    it('should display the input password', () => {
        spectator = createComponent(`
            <password-display password="MOCK_PASSWORD"></password-display>
        `)

        expect(spectator.query('article')).toHaveText('MOCK_PASSWORD');
    })
})