import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe(`${SigninComponent.name}`, () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SigninComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it(`${SigninComponent.name} dado que o componente foi instanciado quando criado então ele deve existir.`, () => {
    expect(component).toBeTruthy();
  });

});
