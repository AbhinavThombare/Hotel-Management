import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { NodeServerApiService } from 'src/app/services/node-server-api/node-server-api.service';
import { NotificationAlertService } from 'src/app/services/notification-alert/notification-alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupdata: FormGroup
  message_error = {
    'name': [
      { type: 'required', message: 'Name is required' },
      { type: 'pattern', message: 'Enter Valid Name' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Enter Valid Email Address' }
    ],
    'mobile': [
      { type: 'required', message: 'Mobile Number is required' },
      { type: 'pattern', message: 'Enter Valid Mobile number' },
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be atleast 6 characters' },
      { type: 'maxlength', message: 'Password must not be above 30 characters' }
    ],
    'cpassword': [
      { type: 'required', message: 'Confirm Password is required' },
      // {type: 'pattern',message: 'Password does not Match'},
      // {type: 'minlength',message: 'Password must be atleast 6 characters'},
      // {type: 'maxlength',message: 'Password must not be above 30 characters'}
    ],
  }

  constructor(
    public formBuilder: FormBuilder,
    private nodeserverapi: NodeServerApiService,
    private notificationapi: NotificationAlertService,
    private router: Router
  ) {
    this.signupdata = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*$')
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      mobile: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10}$'),
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
      ])),
      cpassword: new FormControl('', Validators.compose([
        Validators.required
      ]))

    })
  }



  ngOnInit(): void {
  }

  onSubmit() {
    const userData = this.signupdata.value
    this.nodeserverapi.registerUser(userData).subscribe(
      (res) => {
        console.log(res)
        if (res.status === 200) {
          this.router.navigate([''])
          this.notificationapi.registrationAlert()
          setTimeout(() => {
            this.notificationapi.loginAlert('Login Now!')
          }, 3000);
        }
      },
      (error) => {
        if (error.status === 400) {
          this.notificationapi.errorAlert('Email Alreday Use!')
        }
      }
    )


  }

}
