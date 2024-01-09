import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe(`${TokenService.name}`, () => {
  let service: TokenService;
  const token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRvdWdsbGFzQGVtYWlsLmNvbSIsIm5iZiI6MTY5OTQ2MTc2MywiZXhwIjoxNjk5NDkwNTYzLCJpYXQiOjE2OTk0NjE3NjN9.tBcTqRwNNqEcj9-vbjnPcUV2DIrBPr75NOk-_3MCacE';
  const key: string = 'token';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
    service.setToken(token);
  });

  it(`${TokenService.name} dado que o service foi instanciado quando criado então ele deve existir.`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${TokenService.prototype.setToken.name}
  dado que seja passado um token quando a função for chamada então o token deve ser salvo no localstorage.`, () => {
    const result = localStorage.getItem(key);
    expect(result).toBe(token);
  });

  it(`#${TokenService.prototype.getToken.name}
  dado que exista um token no localstorage quando a função for chamada então o token não deve ser {nulo}, {vazio} ou {undefined}.`, () => {
    const result = service.getToken();
    expect(result).toBeTruthy();
  });

  it(`#${TokenService.prototype.deleteToken.name}
  dado que exista um token no localstorage quando a função for chamada então o token deve ser excluído.`, () => {
    service.deleteToken();
    const result = localStorage.getItem(key);
    expect(result).toBeNull();
  });

  it(`#${TokenService.prototype.hasToken.name}
  dado que exista um token no localstorage quando a função for chamada então deve retornar {true}.`, () => {
    const result = service.hasToken();
    expect(result).toBeTrue();
  });

  it(`#${TokenService.prototype.hasToken.name}
  dado que não exista um token no localstorage quando a função for chamada então deve retornar {false}`, () => {
    service.deleteToken();
    const result = service.hasToken();
    expect(result).toBeFalse();
  });
});
