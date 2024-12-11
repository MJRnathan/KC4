import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 loginForm!: FormGroup;
 className = 'd-none';
 message:string='';
 email: string = '';
  password: string = '';
  protected aFormGroup!: FormGroup;
  captchaResolved: boolean = false;
  recaptchaResponse: string | null = null;

  emailPattern: string = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';




 constructor(private fb:FormBuilder, private auth:AuthService, private http: HttpClient, private router:Router) {
  this.loginForm = fb.group({
    'email': ['', Validators.required],
      'password': ['', Validators.required],
  })
 }



 ngOnInit(){
  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(12)]],
    recaptcha: ['', Validators.required]
    // password: ['', [Validators.required,Validators.pattern(this.passwordPattern), Validators.minLength(8), Validators.maxLength(12)]]
  });
  // this.aFormGroup = this.formBuilder.group({
  //   recaptcha: new FormControl(),
  //   email: new FormControl(),
  //   password: new FormControl(),
  // })
}



onSubmit(){
    const data = this.loginForm.value;
    this.auth.signin(data).subscribe((res)=>{
      if (res.success){
        localStorage.setItem('token', res.token);
        this.router.navigate(['/profile'])
      }else{
        alert(res.message)
      }
    }, err=>{
      alert("Login failed");
    })
  }

  forgotpassword(){
    this.router.navigate(['/forgot-password'])
  }

  // onSubmit(): void {
  //   if (this.loginForm.valid && this.recaptchaResponse) {
  //     const formData = this.loginForm.value;
  //     formData.recaptcha = this.recaptchaResponse;

  //     // Send form data to your backend
  //     this.http.post('YOUR_BACKEND_URL/login', formData).subscribe(response => {
  //       console.log('Login successful:', response);
  //     }, error => {
  //       console.error('Login failed:', error);
  //     });
  //   } else {
  //     console.log('Please complete the reCAPTCHA.');
  //   }
  // }

  // This will be called when the user completes the reCAPTCHA
  onRecaptchaResolved(captchaResponse: string): void {
    this.recaptchaResponse = captchaResponse;
    console.log('reCAPTCHA solved:', captchaResponse);
  }


  loginUser() {
    this.http.post('http://localhost:3000/login', { email: this.email, password: this.password })
      .subscribe((response: any) => {
        if (response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('Login Failed');
        }
      });
  }

// site key of localhost.
  siteKey:string="6LfVWXIqAAAAAAvnAgFcfIYPFLTJC2DPkeD_8z6S";

  // hostinger.
  // siteKey:string="6LcWf3QqAAAAAETBqG-hHx8tM6aGt_DHzJi0YfGp";


  onCaptchaResolved(captchaResponse: string) {
    this.captchaResolved = true; // Set to true when captcha is resolved
  }

  get isLoginButtonDisabled(): boolean {
    return !this.loginForm.valid || !this.captchaResolved;
  }

}






    // this.loginForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(8)]],
    // });




  // onSubmit() {
  //   if (this.loginForm.valid && this.captchaResolved) {
  //     // Handle login logic here
  //     console.log('Form Submitted!', this.loginForm.value);
  //   }
  // }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     // Handle form submission
  //     console.log('Form submitted:', this.loginForm.value);
  //     alert('Success!');
  //   } else {
  //     // Handle invalid form
  //     console.log('Form is invalid');
  //   }
  // }




