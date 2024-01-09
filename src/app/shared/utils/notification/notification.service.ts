import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private horizontalPosition: MatSnackBarHorizontalPosition;
  private verticalPosition: MatSnackBarVerticalPosition;
  private seconds: number;
  private loading: BehaviorSubject<boolean>;

  constructor(private snackBar: MatSnackBar) {
    this.horizontalPosition = 'right';
    this.verticalPosition = 'top';
    this.seconds = 5;
    this.loading = new BehaviorSubject(false);
  }

  public create(message: string): void {
    this.snackBar.open(`${message}`, undefined, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.seconds * 1000,
    });
  }

  public getLoading(): Observable<boolean> {
    return this.loading.asObservable();
  }

  public setLoading(state: boolean): void {
    this.loading.next(state);
  }
}
