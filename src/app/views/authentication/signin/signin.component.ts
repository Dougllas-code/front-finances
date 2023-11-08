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

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  public invalidCredentials!: boolean;
  public loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.initializeVariables();
  }

  private initializeVariables(): void {
    this.invalidCredentials = false;
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
    let request: TAuthRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(request).subscribe({
      next: (res) => {
        // this.router.navigate(['/home']);
      },
      error: (e) => {
        this.notification.create('Erro ao fazer login.');
      },
      complete: () => {},
    });
  }
}
