import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // NEW LOGIN FORM
  // isAuthenticated: boolean;


  form: FormGroup; // loginForm
  private formSubmitAttempt: boolean;

  constructor(
    private formBuilder: FormBuilder, // fb
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.form  =  this.formBuilder.group({
      // 'email': new FormControl(null, [Validators.required, Validators.email]),
      // 'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  // login()
  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value);
    }
    this.formSubmitAttempt = true;
  }


}


