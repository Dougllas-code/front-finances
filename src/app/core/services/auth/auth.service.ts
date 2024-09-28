import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../../entities/user';
import { HttpClient } from '@angular/common/http';
import { TAuthRequest } from '../../../shared/types/auth/TAuthRequest';
import { IGenericResponse } from '../../../shared/interfaces/IGenericResponse';
import { TAuthResponse } from '../../../shared/types/auth/TAuthResponse';
import { ResponseType } from '../../../shared/enums/responseType';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string = environment.apiUrl;
  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
  }

  public login(
    request: TAuthRequest
  ): Observable<IGenericResponse<TAuthResponse>> {
    return this.http
      .post<IGenericResponse<TAuthResponse>>(`${this.apiUrl}/login`, request)
      .pipe(
        tap((res) => {
          if (res.type === ResponseType.Success) {
            this.currentUserSubject.next(new User(res.data));
            this.tokenService.setToken(res.data.token);
          }
        })
      );
  }

  public logout() {
    this.currentUserSubject.next(null);
    this.tokenService.deleteToken();
    this.router.navigate(['/signin']);
  }

  get userData(): User | null {
    return this.currentUserSubject.value;
  }

  get authenticatedUser(): boolean {
    return this.tokenService.getToken() ? true : false;
  }
}
