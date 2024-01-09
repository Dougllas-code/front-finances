import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Regex } from '../../../shared/utils/regex';
import { TAuthRequest } from '../../../shared/types/auth/TAuthRequest';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../shared/utils/notification/notification.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeVariables();
  }

  private initializeVariables(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(Regex.email),
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(Regex.password),
        ]),
      ],
    });
  }

  public login(): void {
    this.loading(true);
    const request: TAuthRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService
      .login(request)
      .pipe(
        finalize(() => {
          this.loading(false);
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (e) => {
          this.notificationService.create('Erro ao fazer login.');
        },
      });
  }

  private loading(state: boolean): void {
    this.notificationService.setLoading(state);
  }
}
