import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TAuthRequest } from '../../../shared/types/auth/TAuthRequest';
import { IGenericResponse } from '../../../shared/interfaces/IGenericResponse';
import { TAuthResponse } from '../../../shared/types/auth/TAuthResponse';
import { environment } from '../../../../environments/environment.development';

describe(`${AuthService.name}`, () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  const apiUrl: string = environment.apiUrl;
  const credentials: TAuthRequest = {
    email: 'user@email.com',
    password: 'Te$t123',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it(`${AuthService.name} dado que o service foi instanciado quando criado então ele deve existir.`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${AuthService.prototype.login.name}
  dado que exista um usuário válido quando a funçào for chamada então deve ser retornado os dados do usuário.`, () => {
    let response = {
      type: 0,
      message: 'Usuário autenticado com sucesso',
      data: {
        id: 1,
        name: 'User Test',
        email: 'user@email.com',
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvdWdsbGFzQGVtYWlsLmNvbSIsIm5iZiI6MTY5OTQ3MjMxOCwiZXhwIjoxNjk5NTAxMTE4LCJpYXQiOjE2OTk0NzIzMTh9.PtzwsnIg4x45R69xLXYDsX_vY696nSaWzZ6W65WLeik',
      },
    };

    service
      .login(credentials)
      .subscribe((res: IGenericResponse<TAuthResponse>) => {
        expect(res).toBeTruthy();
      });

    const request = httpTestingController.expectOne(`${apiUrl}/login`);
    request.flush(response);
    httpTestingController.verify();
  });

  it(`#${AuthService.prototype.logout.name}
  dado que o usuário esteja logado quando a função for chamada então o usuário deve ser deslogado.`, () => {
    service.logout();
    let token = localStorage.getItem('token');
    expect(token).toBeFalsy();
    expect(service.userData).toBeNull();
  });
});
