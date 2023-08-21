import { ComponentFixture, TestBed } from "@angular/core/testing"
import { PasswordControlsComponent } from "./password-controls.component"
import { Spectator, createComponentFactory } from "@ngneat/spectator";
import { Component } from "@angular/core";

@Component({
    selector: 'test',
    template: `
        <password-controls [password]="password" (generate)="onGenerate()"></password-controls>
    `
})
class TestComponent {
    password?: string;
    onGenerate() {}
}

describe('PasswordControlsComponent avec TestBed', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PasswordControlsComponent, TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        fixture.autoDetectChanges();
        component = fixture.componentInstance;
    });

    it('should not show copy button', () => {
        expect(fixture.nativeElement.querySelector('#copy')).toBeNull();
    })

    it('should show a copy button if a password has been generated', () => {
        fixture.componentInstance.password = 'MOCK_PASSWORD';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#copy')).toBeTruthy();
    })

    it('should emit an event when user clicks on button', () => {
        const spy = spyOn(component, 'onGenerate');

        fixture.nativeElement.querySelector('button').click();

        expect(spy).toHaveBeenCalled();
    })

    it('should copy the password when user clicks on copy button', () => {
        const spy = spyOn(navigator.clipboard, "writeText");

        fixture.componentInstance.password = 'MOCK_PASSWORD';
        fixture.detectChanges();

        fixture.nativeElement.querySelector('#copy').click();

        expect(spy).toHaveBeenCalledWith('MOCK_PASSWORD');
        expect(fixture.nativeElement.querySelector('#copy-message').textContent).toContain('Le mot de passe a été copié');
    })

    it('should make the message disappear if a new password is generated', () => {
        const spy = spyOn(navigator.clipboard, "writeText");

        fixture.componentInstance.password = 'MOCK_PASSWORD';
        fixture.detectChanges();

        fixture.nativeElement.querySelector('#copy').click();

        expect(fixture.nativeElement.querySelector('#copy-message')).toBeTruthy();

        fixture.componentInstance.password = 'NEW_MOCK_PASSWORD';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('#copy-message')).toBeNull();

        fixture.nativeElement.querySelector('#copy').click();

        expect(fixture.nativeElement.querySelector('#copy-message')).toBeTruthy();
    })
})

describe('PasswordControlsComponent avec Spectator', () => {
    let spectator: Spectator<TestComponent>;

    const createComponent = createComponentFactory({
        component: TestComponent,
        declarations: [PasswordControlsComponent],
    });

    beforeEach(() => spectator = createComponent());

    it('should emit an event when user clicks on button', () => {
        const spy = spyOn(spectator.component, 'onGenerate');

        spectator.click('button');

        expect(spy).toHaveBeenCalled();

    })

    it('should not show copy button', () => {
        expect(spectator.query('#copy')).toBeNull();
    })

    it('should show a copy button if a password has been generated', () => {
        spectator.setInput('password', 'MOCK_PASSWORD')

        expect(spectator.query('#copy')).toBeTruthy();
    })

    it('should copy the password when user clicks on copy button', () => {
        const spy = spyOn(navigator.clipboard, "writeText");

        spectator.setInput('password', 'MOCK_PASSWORD');

        spectator.click('#copy');

        expect(spy).toHaveBeenCalledWith('MOCK_PASSWORD');
        expect(spectator.query('#copy-message')).toHaveText('Le mot de passe a été copié');
    })

    it('should make the message disappear if a new password is generated', () => {
        const spy = spyOn(navigator.clipboard, "writeText");

        spectator.setInput('password', 'MOCK_PASSWORD');
        spectator.click('#copy');
        expect(spectator.query('#copy-message')).toExist();

        spectator.setInput('password', 'NEW_MOCK_PASSWORD');
        expect(spectator.query('#copy-message')).toBeNull();

        spectator.click('#copy');
        expect(spectator.query('#copy-message')).toExist();
    })
})