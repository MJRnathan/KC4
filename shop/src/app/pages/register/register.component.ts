import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signUpForm!: FormGroup;
  message:string='';
  className = 'd-none';
  isProcess:boolean = false;

  firstName:string='';
  phone: number = 0;
  add_to_telegram:boolean = false;
  place_holder1:string='';
  place_holder2:string='';
  email: string = '';
  password: string = '';
  subscription: number = 30;


  protected aFormGroup!: FormGroup;
  captchaResolved: boolean = false;
  recaptchaResponse: string | null = null;


  emailPattern: string = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';


  // site key of localhost.
  siteKey:string="6LfVWXIqAAAAAAvnAgFcfIYPFLTJC2DPkeD_8z6S";

  // hostinger
  // siteKey:string="6LcWf3QqAAAAAETBqG-hHx8tM6aGt_DHzJi0YfGp";


  constructor(private fb:FormBuilder, private http: HttpClient, private router: Router, private auth: AuthService){
    this.signUpForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'phone':['', Validators.required],
      'add_to_telegram':['true'],
      // 'place_holder1':['', Validators.required],
      // 'place_holder2':['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'subscription_valid_from':[''],
      'subscription_valid_upto':[''],
      'selectedOption': [null, Validators.required],  // 'required' ensures that a selection is made
      // 'subscription':[''],
      'recaptcha': ['', Validators.required],
    })
  }

//   constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private auth: AuthService)
// {}

  ngOnInit(): void {

  }

  // signup(){
  //   this.isProcess = true;
  //  const data = this.signUpForm.value;
  //  delete data['confirm']
  //  this.auth.signup(data).subscribe((res)=>{
  //   if (res.success){
  //     this.isProcess = false;
  //     this.message = "Account has been created."
  //     this.className = 'alert alert-success'
  //   }else{
  //     this.isProcess = false;
  //     this.message = res.message;
  //     this.className = 'alert alert-danger';
  //   }
  //   this.signUpForm.reset()
  //  }, err=>{
  //   this.isProcess = false;
  //   this.message = "Server Error.";
  //   this.className = 'alert alert-danger';
  //  })
  // }

  onSubmit(): void {
    console.log(this.signUpForm.value.selectedOption);



    let valid_from = this.signUpForm.value.subscription_valid_from = Date.now(); // Current timestamp in milliseconds
    // let valid_from = Date.now();// Current timestamp in milliseconds

  let subDays = Number(this.signUpForm.value.selectedOption); // The number of days to add

  // Convert the number of days into milliseconds
  let valid_upto = valid_from + (subDays * 24 * 60 * 60 * 1000); // Add the days in milliseconds

  console.log("Valid from:", valid_from, " to subDays:", subDays, "   upto:", valid_upto);

  this.signUpForm.value.subscription_valid_upto = valid_upto;

    console.log("Upto:",this.signUpForm.value.subscription_valid_upto);
    this.isProcess = true;
    const data = this.signUpForm.value;
    delete data['confirm']
    this.auth.signup(data).subscribe((res)=>{
     if (res.success){
       this.isProcess = false;
       this.message = "Account has been created."
       this.className = 'alert alert-success'
     }else{
       this.isProcess = false;
       this.message = res.message;
       this.className = 'alert alert-danger';
     }
    //  this.signUpForm.reset()
    }, err=>{
     this.isProcess = false;
     this.message = "Server Error.";
     this.className = 'alert alert-danger';
    })


    if (this.signUpForm.valid && this.recaptchaResponse) {
      const formData = this.signUpForm.value;
      formData.recaptcha = this.recaptchaResponse;

      // Send form data to your backend
      this.http.post('YOUR_BACKEND_URL/profile', formData).subscribe(response => {
        console.log('Login successful:', response);
      }, error => {
        console.error('Login failed:', error);
      });
    } else {
      alert('Signup Successful...')
      this.router.navigate(['/profile']);
      console.log('Please complete the reCAPTCHA.');
    }
  }

   // This will be called when the user completes the reCAPTCHA
   onRecaptchaResolved(captchaResponse: string): void {
    this.recaptchaResponse = captchaResponse;
    console.log('reCAPTCHA solved:', captchaResponse);
  }


  registerUser() {
    this.http.post('http://localhost:3000/login', { email: this.email, password: this.password })
      .subscribe((response: any) => {
        if (response.success) {
          this.router.navigate(['/profile']);
        } else {
          alert('Login Failed');
        }
      });
  }

  get isLoginButtonDisabled(): boolean {
    return !this.signUpForm.valid || !this.captchaResolved;
  }

  togglePaymentButton() {
    // Check if any radio button is selected
    const isRadioSelected = document.querySelector('input[name="subscription"]:checked');

    // Get the Payment button and cast it to HTMLButtonElement
    const paymentButton = <HTMLButtonElement>document.getElementById("paymentBtn");

    // Enable/Disable the payment button based on radio selection
    if (isRadioSelected) {
      paymentButton.disabled = false; // Enable button
    } else {
      paymentButton.disabled = true; // Disable button
    }
  }


}
