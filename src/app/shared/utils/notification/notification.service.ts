import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private horizontalPosition: MatSnackBarHorizontalPosition;
  private verticalPosition: MatSnackBarVerticalPosition;
  private seconds: number;

  constructor(private snackBar: MatSnackBar) {
    this.horizontalPosition = 'right';
    this.verticalPosition = 'top';
    this.seconds = 5;
  }

  public create(message: string): void {
    this.snackBar.open(`${message}`, undefined, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.seconds * 1000,
    });
  }
}
