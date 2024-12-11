import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { ForgotPasswordService } from '../../service/forgot-password.service'; // Import the service


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;
  message: string = '';
  errorMessage: string = '';
  successMessage: string = '';


  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private forgotPasswordService: ForgotPasswordService) {
    // Initialize the form group with validation
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

    // Getter for email form control
  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;
      this.http.post<{ message: string }>('http://localhost:3000/api/forgot-password', { email })
        .subscribe({
          next: (response) => {
            this.message = response.message;
            this.errorMessage = '';
          },
          error: (err) => {
            this.errorMessage = err.error.message || 'An error occurred';
            this.message = '';
          }
        });
    }
  }

  // Call the forgotPassword service method
  sendResetLink() {
    const email = this.forgotPasswordForm.get('email')?.value;
    this.forgotPasswordService.forgotPassword({ email })
      .subscribe(
        (response) => {
          // Handle success response (e.g., OTP sent)
          this.successMessage = 'Password reset link has been sent to your email.';
          this.errorMessage = '';
        },
        (error) => {
          // Handle error response (e.g., email not found)
          this.errorMessage = 'Failed to send password reset link. Please try again.';
          this.successMessage = '';
        }
      );
  }


}





