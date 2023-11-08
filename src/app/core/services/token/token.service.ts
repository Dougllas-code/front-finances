import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly key: string = 'token';

  public setToken(token: string): void {
    localStorage.setItem(this.key, token);
  }

  public getToken(): string {
    return localStorage.getItem(this.key) || '';
  }

  public deleteToken(): void {
    localStorage.removeItem(this.key);
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }
}
