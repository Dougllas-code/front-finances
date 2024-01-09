import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NotificationService } from './shared/utils/notification/notification.service';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { HomeComponent } from './views/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    LayoutComponent,
    HomeComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public loading: boolean = false;

  constructor(private notificationService: NotificationService) {
    this.notificationService.getLoading().subscribe((state: boolean) => {
      this.loading = state;
    });
  }
}
